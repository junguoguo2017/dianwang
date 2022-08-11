<template>
    <div>
        <debitCard v-if="target=='DEBITCARD'" :reportData="reportData" :order_no="order_no" @link_topay="link_topay"></debitCard>
        <creaitCard v-else :reportData="reportData" :order_no="order_no" @link_topay="link_topay"></creaitCard>
    </div>

</template>

<script>
    import debitCard from './moXieBank/debitCard'
    import creaitCard from './moXieBank/creditCard'
    export default {
        name: "index",
        props:{
            target:{
              type:String,
              default:'DEBITCARD'
          },
            reportData:{
                type:Object,
                default:()=>{}
            },
            order_no:{
                type:String,
                default: ''
            }
        },
        components:{
            debitCard,creaitCard
        },
        mounted(){
        },
        methods:{
            link_topay(){
                this.$emit('link_topay')
            },
        }
    }
</script>

<style scoped>

</style>
