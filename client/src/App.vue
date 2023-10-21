<script>
import Vue from 'vue';

import {GetMyInfo} from "@/api/myinfo";

export default Vue.extend({
  mpType: 'app',
  onLaunch: function() {
    // console.log('App Launch')
    this.getMyInfo();
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {
    getMyInfo() {
      GetMyInfo().then((res) => {
        console.log('res: ', res);
      })
    }
  },
})

</script>

<style>
	/*每个页面公共css */
</style>
