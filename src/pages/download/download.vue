<template>
  
</template>

<script>
export default {
  name: 'download',
  mounted () {
    const ua = navigator.userAgent;
    function isAndroid() {
      return ua.includes('Android');
    }
    function  isIphone() {
      return ua.includes('iPad') || ua.includes('iPhone');
    }
    if (isAndroid()) {
      location.href = 'http://pgyer.com/linkdam'
    }
    if (isIphone()) {
      location.href = 'https://fir.im/ioslinkdam'
    }
  },
}
</script>
