<template>
  <div class="mainFram">
    <Header ref = "leftLogo"/>
    <section  :class="sectionClass" class="main serviceMain open">
      <side-bar />
      <router-view />
    </section>
    <Footer/>
    <pop></pop>
  </div>
</template>
<script>
  import Header from '@/views/base/header/header';
  import sideBar from '@/views/base/sideBar/sideBar';
  import Footer from '@/views/base/footer/footer';
  import pop from '@/views/base/dialog/pop';
  import axios from 'axios';
  import {mapActions, mapState,mapGetters} from 'vuex';
	export default{
	    name:'container',
		data(){
      return {
        sectionClass: 'main open',
        openID:"",
      };
		},
    mounted(){
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      Header,
      sideBar,
      Footer,
      pop
    },
		created(){
     //@nav-open="toggleClass"
      //this.user=this.$route.params.user;
      //this.pass=this.$route.params.pass;
    },
    methods:{
      toggleClass () {
        if (this.sectionClass === '') {
          this.sectionClass = 'open';
          this.$refs.leftLogo.rightActive = false;
          this.$refs.leftLogo.leftActive = false;
        } else {
          let asectionClass = this.sectionClass.split(' ');
          let _index = asectionClass.indexOf('open');
          if (_index === -1) {
            this.sectionClass += ' ' + 'open';
            this.$refs.leftLogo.rightActive = true;
            this.$refs.leftLogo.leftActive = false;
          } else {
            asectionClass.splice(_index, 1);
            this.sectionClass = asectionClass.join(' ');
            this.$refs.leftLogo.rightActive = false;
            this.$refs.leftLogo.leftActive = true;
          }
        }
      },
    }
	}
</script>
<style lang="less">

</style>
