<template>
  <div class="single-day-action">
    <Item type="primary" @on-click="isCollapsed = !isCollapsed">
      <template #title>
        {{ WEEK_ZH[week] }}
      </template>
      <template #suffix>
        <IconFont
          icon="xiangxia1"
          :font-size="14"
          :style="{
            transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform .3s'
          }"
        />
      </template>
    </Item>
    <!-- 已经保存的 actions -->
    <div
      :class="`single-day-action__actions single-day-action__actions__${week}`"
      :style="{ height: isCollapsed ? '0px' : height }"
    >
      <ActionList
        :actions="actions.items"
        @delete-action="deleteAction"
        @edit-action="editAction"
      />
      <div class="single-day-action__add" @click="() => showAddBox()">
        <IconFont icon="jia-copy1" :font-size="12" />
        {{ actions.items.length > 0 ? '继续设置训练内容' : '设置训练内容' }}
      </div>
    </div>

    <!-- 新增盒子 -->
    <nut-popup
      pop-class="add-box"
      overlay-class="add-box__overlay"
      position="bottom"
      destroy-on-close
      closeable
      safe-area-inset-bottom
      v-model:visible="isAddBoxShow"
      @closed="cancel"
    >
      <nut-tabs class="add-box__tabs" v-if="newAction" v-model="newAction.type" type="smile">
        <template v-slot:titles>
          <div
            class="add-box__tabs__titles__item"
            v-for="action in defaultActions"
            :class="{ active: newAction.type === action.value }"
            :key="action.value"
            @click="handleTabChange(action)"
          >
            <div class="add-box__tabs__titles__item__icon">
              <image
                :style="{ width: action.iconWidth + 'px', height: action.iconHeight + 'px' }"
                :src="action.icon"
              />
            </div>

            <span class="add-box__tabs__titles__item__text">{{ action.text }}</span>
          </div>
        </template>
        <nut-tab-pane :pane-key="ACTION_TYPE.MACHINE">
          <Machine />
        </nut-tab-pane>
        <nut-tab-pane :pane-key="ACTION_TYPE.RUNNING">
          <Running />
        </nut-tab-pane>
        <nut-tab-pane :pane-key="ACTION_TYPE.BARE_HANDED">
          <BareHanded />
        </nut-tab-pane>
      </nut-tabs>
      <nut-button class="add-box__sure" type="info" @click="sure()">确定</nut-button>
    </nut-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, provide, onMounted } from 'vue';

import Taro from '@tarojs/taro';
import ActionList from './ActionsList.vue';
import { Machine, Running, BareHanded } from './ActionTemplates';
import { Item, IconFont } from '@/components';

import { ACTION_TYPE, defaultActions, WEEK_ZH } from '@/config';
import { TAction } from '@/types/plan';
import { Actions, Action, BaseAction } from '@/models';
import { toast } from '@/utils';

const props = defineProps({
  week: {
    type: Number,
    required: true
  },
  // activeWeek: {
  //   type: Number
  // },
  actions: {
    type: Array as () => TAction[],
    default() {
      return [];
    }
  }
});
const emit = defineEmits(['onActionSaved']);

const actions = ref<Actions>(new Actions(props.actions));
const newAction = ref<BaseAction>();
const isAddBoxShow = ref();
const option = ref<'add' | 'edit'>('add');
const isCollapsed = ref(false);
const height = ref('auto');

provide('newAction', newAction);

// watch(
//   () => props.activeWeek,
//   val => {
//     isAddBoxShow.value = val === props.week;
//   }
// );

const getHeight = () => {
  height.value = 'auto';
  setTimeout(() => {
    const query = Taro.createSelectorQuery();
    query
      .select(`.single-day-action__actions__${props.week}`)
      .boundingClientRect(rect => {
        // console.log('SingleDayAction', 'height', rect);
        height.value = rect.height + 'px';
      })
      .exec();
  }, 1000);
};

onMounted(() => {
  getHeight();
});

const handleTabChange = (action: (typeof defaultActions)[number]) => {
  // 保证 id 不变
  newAction.value = new Action().create({ type: action.value, id: newAction.value?.id });
};

const updateActionsFromProps = () => {
  emit(
    'onActionSaved',
    props.week,
    actions.value.items.map(action => action.getPropertiesForApi())
  );
};

watch(actions.value.items, val => {
  console.log('single-day-action', 'actions change', val);
  updateActionsFromProps();
});

const cancel = () => {
  isAddBoxShow.value = false;
};

const sure = () => {
  if (!newAction.value?.validator()) {
    toast('请填写完整');
    return;
  }

  if (option.value === 'add') {
    const res = actions.value.add(newAction.value);
    if (!res) {
      toast('已存在该动作', 'error');
      return;
    }
  } else {
    actions.value.edit(newAction.value);
  }

  isAddBoxShow.value = false;

  // emit('setActiveWeek');

  getHeight();
};

const editAction = (action: BaseAction) => {
  console.log('SingleDayAction', 'action', action);
  option.value = 'edit';
  isAddBoxShow.value = true;

  // 使用旧数据构造一个新的 Action 对象， 防止同步修改
  newAction.value = new Action().create(action.getAllProperties());
};

const deleteAction = (action: BaseAction) => {
  actions.value.delete(action);

  getHeight();
};

const showAddBox = () => {
  if (isAddBoxShow.value) {
    return;
  }
  option.value = 'add';
  isAddBoxShow.value = true;
  // 默认器械
  newAction.value = new Action().create({ type: ACTION_TYPE.MACHINE });
  // emit('setActiveWeek', props.week);
};
</script>

<style lang="scss">
.single-day-action {
  margin: 5px 0;
  &__actions {
    will-change: height;
    transition: height 0.3s ease-in-out;
    overflow: hidden;
  }
  &__add {
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: normal;
    line-height: 51px;
    color: $blue2;
    margin-bottom: 5px;
    padding: 5px 0;
    background: #ffffff;
    box-shadow: 0 1px 7px #edeef1;
    .icon-jia-copy1 {
      margin-right: 10px;
    }
  }
}
.add-box {
  border-radius: 40px 40px 0 0;
  box-shadow: 0px 0px 40px 0px rgba(29, 22, 23, 0.1);
  padding: 30px;
  &__sure {
    width: 315px;
    height: 50px;
    border-radius: 99px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 18px 129px;
    background: linear-gradient(281deg, #92a3fd 0%, #9dceff 124%);
    box-shadow: 0px 10px 22px 0px rgba(149, 173, 254, 0.3);
  }
  &__tabs {
  }
  .nut-tabs__titles {
    display: flex;
    justify-content: flex-start;
    height: 68px;
    background: unset;
  }
  .nut-tab-pane {
    padding: 0;
  }
  &__tabs__titles__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    :last-child {
      margin-right: 0;
    }

    &.active {
      .add-box__tabs__titles__item__icon {
        background: url('../../../assets/images/selected.png') no-repeat center center / 100% 100%;
      }
      .add-box__tabs__titles__item__text {
        color: $blue1;
      }
    }
    &__text {
      margin-top: 10px;
      font-size: 12px;
      font-weight: normal;
      line-height: 18px;
      color: #3d3d3d;
    }
    &__icon {
      @include center;
      width: 40px;
      height: 40px;
      background: url('../../../assets/images/unselected.png') no-repeat center center / 100% 100%;
    }
  }
}
.nut-collapse-item .nut-collapse-item__title {
  font-size: 12px;
  font-weight: normal;
  line-height: 18px;
  border-bottom: 0.8px solid #dddada;
  color: $gray1;
  background: linear-gradient(280deg, rgba(146, 163, 253, 0.2) -1%, rgba(157, 206, 255, 0.2) 124%);
}
.nut-collapse__item-wrapper__content {
  padding: 0 !important;
}
</style>
