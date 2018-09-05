<template>
    <div >
        <div class="">
            <top-users-component class="mt-5 mr-3 d-inline-block" /> 
            <top-products-component class="mt-5 mr-3 d-inline-block" />
            <top-likes-component class="mt-5 d-inline-block" />
        </div>

        <div class="card container w-50 mt-5">
            <p class="h2 mt-2 title">Ventas de esta semana</p>
            <buys-of-this-week-component  />
        </div>

        <div class="card container w-50 mt-5">
            <p class="h2 mt-2 title">Ventas de este mes</p>
            <buys-of-this-month-component  />
        </div>

        <div class="card container w-50 mt-5">
            <p class="h2 mt-2 title">Ventas de este año</p>
            <buys-of-this-year-component  />
        </div>

        <div class="card container w-50 mt-5">
            <p class="h2 mt-2 title">Ventas por horas</p>
            <hour-of-buys-component-vue  />
        </div>

        <div class="card container w-50 mt-5">
            <p class="h2 mt-2 title">Numero de usuarios</p>
            <number-of-users-component-vue  />
        </div>

        <money-of-different-times-component-vue class="mt-5" /> 
    </div>    
</template>

<script>
import TopUsersComponent from './TopUsersComponent.vue'
import TopProductsComponent from './TopProductsComponent.vue'
import TopLikesComponent from './TopLikesComponent.vue'
import BuysOfThisWeekComponent from './BuysOfThisWeekComponent.vue'
import BuysOfThisMonthComponent from './BuysOfThisMonthComponent.vue'
import BuysOfThisYearComponent from './BuysOfThisYearComponent.vue'
import MoneyOfDifferentTimesComponentVue from './MoneyOfDifferentTimesComponent.vue';
import HourOfBuysComponentVue from './HourOfBuysComponent.vue';
import NumberOfUsersComponentVue from './NumberOfUsersComponent.vue';


export default {
    components: {
        TopUsersComponent,
        TopProductsComponent,
        TopLikesComponent,
        BuysOfThisWeekComponent,
        BuysOfThisMonthComponent,
        BuysOfThisYearComponent,
        MoneyOfDifferentTimesComponentVue,
        HourOfBuysComponentVue,
        NumberOfUsersComponentVue
    },
    beforeCreate: function() {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    }
    
}
</script>

<style>

</style>

