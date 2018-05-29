import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001'
})
const apis = {
    readCategory: (id) => api.get('/categories/' + id),
    loadCategories: () => api.get('/categories'),
    addCategory: (category) => {
        return api.post('/categories',
            {
                category: category
            })
    },
    editCategory: (category) => {
        return api.put('/categories/' + category.id, category)
    },
    removeCategory: (categoryId) => {
        return api.delete('/categories/' + categoryId)
    },
 
    readProduct: (id) => api.get('/products/' + id),
    createProduct: (product) => api.post('/products', product),
    editProduct: (product) => api.put('/products/' + product.id, product),
    loadProducts: (category) => api.get('/products?category=' + category),
    deleteProduct: (id) => api.delete('/products/' + id)
}

export default apis