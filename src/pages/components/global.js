import navheader from './navheader'
import vapp from './vapp/vapp'
import scrollPage from './scrollPage'
import loading from './loading'
import pie from './pie'
import flySwipeOut from './swipeout/flySwipeOut'
import flySwipeoutItem from './swipeout/flySwipeoutItem'
import flyPopup from './centerPopup'
import bottomPopup from './bottomPopup'
import carousel from './carousel'

import flySwiper from './swiper'
import safeKeyboard from './safeKeyboard'
import numkeyBoard from "./numkeyBoard";
const install = {
    install:function (Vue) {
        Vue.component(navheader.name,navheader)
        Vue.component(vapp.name,vapp)
        Vue.component(scrollPage.name,scrollPage)
        Vue.component(loading.name,loading)
        Vue.component(pie.name,pie)
        Vue.component(flySwipeOut.name,flySwipeOut);
        Vue.component(flySwipeoutItem.name,flySwipeoutItem);
        Vue.component(flyPopup.name,flyPopup);
        Vue.component(bottomPopup.name,bottomPopup);
        Vue.component(carousel.name,carousel);

        Vue.component(flySwiper.name,flySwiper);
        Vue.component(safeKeyboard.name,safeKeyboard);
        Vue.component(numkeyBoard.name,numkeyBoard);

    }
}
export default install
