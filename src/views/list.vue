<template>
  <div v-show="list.length">
      <div class="list-control">
        <div class="list-control-filter">
          <span>品牌：</span>
          <span
            class="list-control-filter-item"
            :class="{ on: item === filterBrand }"
            v-for="item in brands"
            :key="item"
            @click="handleFilterBrand(item)">{{item}}</span>
        </div>
        <div class="list-control-filter">
          <span>颜色：</span>
          <span
            class="list-control-filter-item"
            :class="{ on: item === filterColor }"
            v-for="item in colors"
            :key="item"
            @click="handleFilterColor(item)">{{item}}</span>
        </div>
        <div class="list-control-order">
          <span>排序：</span>
          <span class="list-control-order-item"
                :class="{ on: order === '' }">默认</span>
          <span class="list-control-order-item">销量</span>
          <span class="list-control-order-item">价格</span>
        </div>
      </div>
      <Product></Product>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Product from '../components/product'

export default {
  components: {
    Product
  },
  data () {
    return {
      filterBrand: '',
      filterColor: '',
      order: ''
    }
  },
  computed: {
    ...mapActions(['getProductList']),
    ...mapGetters(['list', 'brands', 'colors'])
  },
  mounted () {
    this.getProductList()
  },
  methods: {
    handleFilterBrand (brand) {
      this.filterBrand = this.filterBrand === brand ? '' : brand
    },
    // 增加颜色过滤
    handleFilterColor (color) {
      this.filterColor = this.filterColor === color ? '' : color
    }
  }
}
</script>
<style scoped>
  .list-control{
    background: #fff;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
  }
  .list-control-filter{
    margin-bottom: 16px;
  }
  .list-control-filter-item,
  .list-control-order-item{
    cursor: pointer;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
    display: inline-block;
  }
  .list-control-filter-item.on{
    background:  #f2352e;
    border: 1px solid #f2352e;
    color: #fff;
  }
</style>
