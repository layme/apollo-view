import Vue from 'vue'

const nullFilter = val => {
  if (val) {
    return val
  } else {
    return '-'
  }
}

const carTypeFilter = val => {
  switch (val) {
    case 'a':
      return '海狮'
    case 'b':
      return '海星'
    case 'c':
      return '厢货'
    case 'd':
      return 'GO1'
  }
}

const isRemindFilter = val => {
  switch (val) {
    case 0:
      return '已提醒'
    case 1:
      return '未提醒'
    default:
      return '未知'
  }
}

Vue.filter('nullFilter', nullFilter)
Vue.filter('carTypeFilter', carTypeFilter)
Vue.filter('isRemindFilter', isRemindFilter)
