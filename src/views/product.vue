<template>
  <div v-if="product">
    <div class="product">
      <div class="product-image">
        <img :src="product.image">
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <div class="product-cost">￥ {{ product.cost }}</div>
        <div class="product-add-cart"
             @click="handleAddtoCart">加入购物车</div>
      </div>
    </div>
    <div class="product-desc">
      <h2>产品介绍</h2>
        <img v-for="n in 10" :src="'http://ordfm6aah.bkt.clouddn.com/shop/' + n + '.jpeg'" :key="n">
    </div>
  </div>
</template>
<script>
import productData from '../api/product.js'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      id: parseInt(this.$route.params.id),
      product: null
    }
  },
  methods: {
    ...mapMutations(['addCart']),
    getProduct () {
      this.product = productData.find(item => item.id === this.id)
    },
    handleAddtoCart () {
      this.addCart(this.id)
    }
  },
  mounted () {
    console.log(this.id)
    this.getProduct()
    console.log(this.product)
  }
}
</script>
<style scoped>
  .product {
    margin: 32px;
    padding: 32px;
    background: #fff;
    border: 1px solid #dddee1;
    border-radius: 10px;
    overflow: hidden;
  }
  .product-image {
    width: 50%;
    height: 550px;
    float: left;
    text-align: center;
  }
  .product-image img{
    height: 100%;
  }
  .product-info{
    width: 50%;
    float: left;
    padding: 150px 0 250px;
    height: 150px;
    text-align: center;
  }
  .product-cost{
    color: #f2352e;
    margin: 8px 0;
  }
  .product-add-cart {
    display: inline-block;
    padding: 8px 64px;
    margin: 8px 0;
    background: #2d8cf0;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
