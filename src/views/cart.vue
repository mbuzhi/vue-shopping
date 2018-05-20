<template>
  <div class="cart">
    <div class="cart-header">
      <div class="cart-header-title">购物清单</div>
      <div class="cart-header-main">
        <div class="cart-info">商品信息</div>
        <div class="cart-price">单价</div>
        <div class="cart-count">数量</div>
        <div class="cart-cost">小计</div>
        <div class="cart-delete">删除</div>
      </div>
    </div>
    <div class="cart-content">
      <div class="cart-content-main" v-for="(item,index) in cartList" :key="index">
        <div class="cart-info">
          <img :src="productDictList[item.id].image">
          <span>{{ productDictList[item.id].name }}</span>
        </div>
        <div class="cart-price">￥ {{ productDictList[item.id].cost }}</div>
        <div class="cart-count">
          <span class="cart-control-minus" @click="handleCount(index,-1)">-</span>
          {{ item.count }}
          <span class="cart-control-add" @click="handleCount(index,1)">+</span>
        </div>
        <div class="cart-cost">￥ {{ productDictList[item.id].cost * item.count }}</div>
      </div>
      <div class="cart-empty">购物车为空</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import productData from '../api/product.js'

export default {
  data () {
    return {
      productList: productData
    }
  },
  computed: {
    ...mapState(['cartList']),
    productDictList () {
      const dict = {}
      this.productList.forEach(item => {
        dict[item.id] = item
      })
      return dict
    }
  },
  methods: {
    ...mapMutations(['editCartCount']),
    handleCount (index, count) {
      if (count < 0 && this.cartList[index].count === 1) return
      this.editCartCount({
        id: this.cartList[index].id,
        count: count
      })
    }
  }
}
</script>
<style scoped>
  .cart {
    margin: 32px;
    background: #fff;
    border: 1px solid #dddee1;
  }
  .cart-header-title {
    padding: 16px 32px;
    border-bottom: 1px solid #dddee1;
    border-radius: 10px 10px 0 0;
    background: #f8f8f9;
  }
  .cart-header-main {
    padding: 8px 32px;
    overflow: hidden;
    border-bottom: 1px solid #dddee1;
    background: #eee;
    overflow: hidden;
  }
  div.cart-info {
    width: 60%;
    text-align: left;
  }
  .cart-price{
        width: 10%;
    }
    .cart-count{
        width: 10%;
    }
    .cart-cost{
        width: 10%;
    }
    .cart-delete {
        width: 10%;
    }
    .cart-empty{
        text-align: center;
        padding: 32px;
    }
    .cart-content-main {
      padding: 0 32px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border-bottom: 1px solid e9eaec;
      overflow: hidden;
    }
    .cart-content-main div{
      float: left;
    }
    .cart-content-main img{
      width: 40px;
      height: 40px;
      position: relative;
      top: 10px;
    }
</style>
