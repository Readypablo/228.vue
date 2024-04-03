//Create a new component for product-details with a prop of details. 

Vue.component('product-details', {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <ul>
        <p v-for="detail in details">{{ detail }}</p>
      </ul>
    `
  })
  
  
  
  Vue.component('product', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: `
     <div class="product">
          
        <div class="product-image">
                <img :src="image" />
        </div>
  
        <div class="product-info">
            <h1>{{ title }}</h1>
                <p v-if="inStock">есть в наличии</p>
                <p v-else>нету в наличии</p>
                <p>Доставка: {{ shipping }}</p>
    
            <product-details :details="details">
            </product-details>
            <div class="flex">

                    <div class="color-box"
                        v-for="(variant, index) in variants" 
                        :key="variant.variantId"
                        :style="{ backgroundColor: variant.variantColor }"
                        @mouseover="updateProduct(index)"
                        >
                    </div> 
            </div> 
            <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
                    >
                    добавить
            </button>
  
            <div class="cart">
              <p>корзина({{ cart }})</p>
            </div>
  
         </div>  
      
      </div>
     `,
    data() {
      return {
          product: 'Носки',
          brand: 'UMK-firms',
          selectedVariant: 0,
          details: ['100% хлопок', '100% круто', 'можно стирать'],
          variants: [
            {
              variantId: 2234,
              variantColor: 'green',
              variantImage:  '3.jpg',
              variantQuantity: 10     
            },
            {
              variantId: 2235,
              variantColor: 'blue',
              variantImage: '2.jpg',
              variantQuantity: 0     
            }
          ],
          cart: 0
      }
    },
      methods: {
        addToCart: function() {
            this.cart += 1
        },
        updateProduct: function(index) {  
            this.selectedVariant = index
        }
      },
      computed: {
          title() {
              return this.brand + ' ' + this.product  
          },
          image(){
              return this.variants[this.selectedVariant].variantImage
          },
          inStock(){
              return this.variants[this.selectedVariant].variantQuantity
          },
          shipping() {
            if (this.premium) {
              return "Бесплатно"
            }
              return 2.99
          }
      }
  })
  
  var app = new Vue({
      el: '#app',
      data: {
        premium: true
      }
  })