/**
 * order service
 */

import { factories } from '@strapi/strapi';
import { getId } from '../../../helpers/id';

const services = () => ({
    async payment(){
        const {id: cart} = await strapi.service('api::cart.cart').getUserCart()


        const order = await strapi.entityService.create('api::order.order', {
            data: {
                cart,
                user:getId()
            }
        })

        const newCart = await strapi.entityService.create('api::cart.cart', {
            data: {
                user: getId()
            }
        })

        return order



    }
})

export default factories.createCoreService('api::order.order');
