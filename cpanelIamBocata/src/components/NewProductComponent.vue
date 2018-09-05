<template>
  <div class="container w-50 mt-3 pb-5 card">

    <p class="h1 text-center mb-2 mt-3 title">Nuevo Producto</p>
    
    <form @submit.prevent="submit">

        <div class="text-info ml-5 mr-5 ">
            <md-field>
                <label class="text-info">Nombre de producto</label>
                <md-input v-model="name" type="text" required></md-input>
            </md-field>
        </div>

        <div class="mr-5 row ml-5">
            <md-field class="col mr-3">
                <label class="text-info">Precio</label>
                <md-input v-model="price" type="text" maxlength="5" required pattern="^\d+(?:\.\d{1,2})?$"></md-input>
            </md-field>

            <md-field class="col">
                <label class="text-info">Precio como "del día"</label>
                <md-input v-model="priceoftheday" type="text" maxlength="5" required pattern="^\d+(?:\.\d{1,2})?$"></md-input>
            </md-field>
        </div>

        <div class="md-layout-item mr-5 ml-5">
            <md-field>
                <label for="categorySelect" class="text-info">Categoria</label>
                <md-select v-model="selectedCategory" name="categorySelect" id="categorySelect">

                    <template v-for="category in categories">
                        <md-option :value="category" v-bind:key="category">{{category}}</md-option>
                    </template>
                    
                </md-select>
            </md-field>
        </div>

        <div class="mr-5 mt-2 ml-5 text-info">
            <md-field>
                <label class="text-info">Foto del nuevo producto</label>
                <md-file v-model="photo" @md-change="fileListEvent" accept="image/*" required />
            </md-field>
        </div>

        <div class="text-info ml-5 mr-5 ">
            <md-field>
                <label class="text-info">Añadir Ingrediente</label>
                <md-input v-model="auxIngredient" type="text"></md-input>
                <button type="button" class="btn btn-seconday bg-warning border-0" 
                            @click="addIngredient">
                    Add
                </button>
            </md-field>
        </div>

        <div class="text-info ml-5 mr-5 ">
            <md-list>
                <template v-for="ingredient in ingredients">
                    <div v-bind:key="ingredient">
                        <md-list-item>
                            <span class="md-list-item-text">{{ingredient}}</span>
                            <button type="button" class="btn btn-seconday bg-warning border-0"
                             @click="deleteIngredient(ingredient)">
                                Delete
                            </button>
                        </md-list-item>
                    </div>
                </template>
            </md-list>
        </div>

        <input type="submit" class="btn btn-primary bg-warning border-0 mt-4" value="Crea Producto">

    </form>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../api/config.js'

export default {
  data() {
      return {
          nameLabel: 'Nombre del producto', 
          mailLabel: 'Email',
          passwordLabel: 'Password',
          repeatPasswordLabel: 'Repetir password',
          permissionLevelLabel: 'Tipo de usuario',
          price: 0.00,
          priceoftheday: 0.00,
          categories: [],
          ingredients: [],
          auxIngredient:'',
          photo: '',
          photoFile: '',
          selectedCategory: '',
          name: ''
      }      
  }, 
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  created() {
        var url = config.host + config.paths.categoryList + 
            'idUser=' + this.$session.get('userData').id + 
                '&API_KEY=' + config.apiKey

        axios.get(url)
            .then((res) => {
                this.categories = res.data
            }).catch((err) => {
                this.$swal('Fallo de conexión con el servidor.')
            });
  },
  methods: {
        submit: function() {

            if (this.ingredients.length < 1) {
                this.$swal('Hay que introducir almenos un ingrediente.')
                return;
            }

            let ingrediensForBackend = "";
            let first = true

            for (let i = 0; i < this.ingredients.length; i++) {

                if (!first) {
                    ingrediensForBackend += "-"
                } else {
                    first = false;
                }

                ingrediensForBackend += this.ingredients[i]
                
            }

            let formData = new FormData();

            formData.append('name', this.name)
            formData.append('category', this.categories.indexOf(this.selectedCategory) +1)
            formData.append('price', this.price)
            formData.append('priceoftheday', this.priceoftheday)
            formData.append('productImage', this.photoFile)
            formData.append('API_KEY', config.apiKey)
            formData.append('userId', this.$session.get('userData').id)
            formData.append('ingredients', ingrediensForBackend)

            var url = config.host + config.paths.createProduct;

            console.log(this.photoFile)

            axios.post(url, 
                formData )
                .then(res => {

                    console.log(res)

                    if (res.data.done) {
                        this.$swal('donete')
                    } else {
                        this.$swal('retorna false')
                        console.log(res.data)
                    }

                })
                .catch(err => {
                    this.$swal('fail' + err)
                })

        },
        fileListEvent: function(fileList) {
            console.log('salta el event')
            console.log(fileList)
            console.log(fileList[0])
            this.photoFile = fileList[0]            
        },
        addIngredient: function() {
            if (this.auxIngredient.length != 0) {
                this.ingredients.push(this.auxIngredient.trim())
                this.auxIngredient = ''
            }
        },
        deleteIngredient: function(ingredient) {
            
            var index = this.ingredients.indexOf(ingredient)
            if (index != -1) this.ingredients.splice(index, 1)
        }
    }
}
</script>

<style>

</style>

