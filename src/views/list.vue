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
                :class="{ on: order === '' }"
                @click="handleOrderDefault">默认</span>
          <span class="list-control-order-item"
                :class="{ on: order ==='sales' }"
                @click="handleOrderSales">
                销量
                <template v-if="order === 'sales'">↓</template>
                <template v-else>&nbsp;&nbsp;</template>
                </span>
          <span class="list-control-order-item"
                :class="{ on: order.indexOf('cost') > -1 }"
                @click="handleOrderCost">
                价格
                <template v-if="order === 'cost-asc'">↑</template>
                <template v-else-if="order === 'cost-desc'">↓</template>
                <template v-else>&nbsp;&nbsp;</template>
                </span>
        </div>
      </div>
      <Product v-for="item in filterAndOrderedList" :key="item.id" :info="item"></Product>
      <!-- <div v-for="item in filterAndOrderedList" :key="item.id">{{ item.name }}</div> -->
      <div class="product-not-found"
           v-show="!filterAndOrderedList.length">暂无相关商品</div>
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
  mounted () {
    this.getProductList()
  },
  computed: {
    ...mapGetters(['list', 'brands', 'colors']),
    filterAndOrderedList () {
      let curList = [...this.list]
      if (this.filterBrand !== '') {
        curList = curList.filter(item => item.brand === this.filterBrand)
      }
      if (this.filterColor !== '') {
        curList = curList.filter(item => item.color === this.filterColor)
      }
      if (this.order !== '') {
        if (this.order === 'sales') {
          curList = curList.sort((a, b) => b.sales - a.sales)
        } else if (this.order === 'cost-asc') {
          curList = curList.sort((a, b) => b.cost - a.cost)
        } else if (this.order === 'cost-desc') {
          curList = curList.sort((a, b) => a.cost - b.cost)
        }
      }
      return curList
    }
  },
  methods: {
    ...mapActions(['getProductList']),
    handleFilterBrand (brand) {
      this.filterBrand = this.filterBrand === brand ? '' : brand
    },
    // 增加颜色过滤
    handleFilterColor (color) {
      this.filterColor = this.filterColor === color ? '' : color
    },
    handleOrderDefault () {
      this.order = ''
    },
    handleOrderSales () {
      this.order = 'sales'
    },
    handleOrderCost () {
      this.order = this.order === 'cost-asc' ? 'cost-desc' : 'cost-asc'
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
  .list-control-filter-item.on,
  .list-control-order-item.on{
    background:  #f2352e;
    border: 1px solid #f2352e;
    color: #fff;
  }
  .product-not-found {
    text-align: center;
    padding: 32px;
  }
</style>
