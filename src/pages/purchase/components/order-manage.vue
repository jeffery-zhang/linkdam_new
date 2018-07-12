<template>
  <section class="order-manage">
    <el-tabs>
      <el-tab-pane :label="$t('PURCHASE.AUCTION.CONFIRM_ORDER')">
        <cart @settlement="createOrder" :note="true" :pay-loading="payLoading"></cart>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import postData from 'service/postData'
import cart from 'comp/cart'

export default {
  name: 'order-manage',
  components: {
    cart,
  },
  data () {
    return {
      payLoading: false,
    }
  },
  computed: {
    ...mapState([
      'addressId',
    ]),
  },
  methods: {
    createOrder(remark) {
      if (!this.addressId) {
        const error = this.$t('PURCHASE.CART.NO_ADDR');
        this.$message.error(error);
        return;
      }
      this.payLoading = true;
      const params = {
        addressId: this.addressId,
        remark,
      };
      postData().create(params).then(res => {
        this.payLoading = false;
        if (!res.result) {
          this.$message.error(res.message);
          return;
        }
        this.$router.push({
          name: 'payment',
          params: {
            order: res.data,
          },
        });
      }).catch(err => {
        this.payLoading = false;
      });
    },
  },
}
</script>
