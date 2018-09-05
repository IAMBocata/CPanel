<template>
    <div class="container card w-50">
        <div class="btn-group-vertical mt-4 ml-4 mr-5 mb-4">

            <div class="container mb-2">
                <p class="title h3"> Aloha, {{ name }}</p>
            </div>
            
            <div class="btn-group">
                <button type="button" class="btn btn-primary mb-4 bg-warning text-dark border-0 " @click="goToBuyList">
                Pantalla de comandos
                </button>
            </div>

            <div class="btn-group">
                
                <button type="button" class="btn btn primary text-dark dropdown-toggle border-0 mb-4 bg-warning" data-toggle="dropdown">
                    Gestionar Productos
                </button>

                <div class="dropdown-menu container pl-5 pr-5 border-0">
                    <button type="button" @click="goToProductList" class="btn btn-primary mb-3 bg-info text-white border-0">Ver productos</button>
                    <button type="button" @click="goToNewProduct" class="btn btn-primary mb-1 bg-info text-white border-0">Nuevo producto</button>
                </div>

            </div>

            <div class="btn-group">
                
                <button type="button" class="btn btn primary text-dark dropdown-toggle border-0 mb-4 bg-warning" data-toggle="dropdown">
                    Gestionar Categorías
                </button>

                <div class="dropdown-menu container pl-5 pr-5 border-0">
                    <button type="button" @click="goToCategoryList" class="btn btn-primary mb-3 bg-info text-white border-0">Ver categorías</button>
                    <button type="button" @click="goToNewCategory" class="btn btn-primary mb-1 bg-info text-white border-0">Nueva categoría</button>
                </div>

            </div>

            <div class="btn-group" v-if="isAdmin">
                
                <button type="button" class="btn btn primary text-dark dropdown-toggle border-0 mb-4 bg-warning" data-toggle="dropdown">
                    Gestionar Usuarios
                </button>

                <div class="dropdown-menu container pl-5 pr-5 border-0">
                    <button type="button" @click="goToUserList" class="btn btn-primary mb-3 bg-info text-white border-0">Ver usuarios</button>
                    <button type="button" @click="goToNewUser" class="btn btn-primary mb-1 bg-info text-white border-0">Nuevo Usuario</button>
                </div>

            </div>

            <button type="button" class="btn btn-primary mb-4 bg-warning text-dark border-0" @click="goToBI">
                Business Intelligence
            </button>

            <button type="button" class="btn btn-primary mb-4 bg-warning text-dark border-0" @click="goToParameters">
                Gestionar parámetros del sistema
            </button>

            <button type="button" class="btn btn-primary mb-4 bg-warning text-dark border-0" @click="goToChangePassword">
                Gestionar mi cuenta
            </button>

            <button type="button" @click="logout" class="btn btn-primary mb-3 bg-warning text-dark border-0">
                Logout
            </button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
      return {
          name: 'a',
          isAdmin: false
      }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  created: function() {
      this.name = this.$session.get('userData').name
      this.isAdmin = (this.$session.get('userData').permissionLevel == 3)
  },
  methods: {
      goToBuyList() {
        this.$router.push('/Buys')
      },
      goToUserList() {
        this.$router.push('/Users')
      },
      goToNewUser() {
        this.$router.push('/NewUser')
      },
      goToProductList() {
        this.$router.push('/Products')
      },
      goToNewProduct() {
        this.$router.push('/NewProduct')
      },
      goToCategoryList() {
        this.$router.push('/Categories')
      },
      goToNewCategory() {
        this.$router.push('/NewCategory')
      },
      goToChangePassword() {
        this.$router.push('/ChangePassword')
      },
      goToParameters() {
        this.$router.push('/Parameters')
      },
      goToBI() {
        this.$router.push('/BI')
      },
      logout() {
        this.$session.destroy()
        this.$router.push('/')
      }
  }
}
</script>

<style>

</style>
