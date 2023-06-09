import Taro from '@tarojs/taro';

export function toast(title: string, type?: 'error' | 'success' | 'loading' | 'none') {
  Taro.showToast({
    title,
    icon: type || 'error',
    duration: 2000
  });
}

export function go(option: Taro.navigateTo.Option) {
  Taro.navigateTo(option);
}

export function back(option?: Taro.navigateTo.Option) {
  Taro.navigateBack();
}
interface ITime {
  time: number;
  year: string;
  month: string;
  day: number;
  dayOfWeek: number;
}

//获取当前时间信息
export function getDate(timestr?: number): ITime {
  const times = {} as ITime;
  const nowDate = timestr ? new Date(timestr) : new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;
  const nowDay = nowDate.getDate();
  const nowDayOfWeek = nowDate.getDay(); //本周的第几天
  times.time = nowDate.getTime();
  times.year = nowYear.toString();
  times.month = nowMonth.toString();
  times.day = nowDay;
  times.dayOfWeek = nowDayOfWeek == 0 ? 7 : nowDayOfWeek; // 如果是周日，就变成周七
  return times;
}
