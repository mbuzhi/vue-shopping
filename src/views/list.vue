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
            v-for="item in colors"
            :key="item">{{item}}</span>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      filterBrand: ''
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
  .list-control-filter-item{
    cursor: pointer;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
    display: inline-block;
  }
  .list-control-filter-item.on{
    background:  #f2352e;
  }
</style>
