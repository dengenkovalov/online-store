import {$host, $authHost} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const addBasketDevice = async (userId, deviceId, devicePrice) => {
    const {data} = await $authHost.post('api/basket', {userId, deviceId, devicePrice})
    return data
}

export const deleteBasketDevice = async (basketId, deviceId) => {
    const {data} = await $authHost.delete('api/basket', {data: {basketId, deviceId}})
    return data
}

export const changeQuantity = async (basketId, deviceId, quantity, sum) => {
    const {data} = await $authHost.put('api/basket', {basketId, deviceId, quantity, sum})
    return data
}

export const fetchBasket = async (userId) => {
    const {data} = await $authHost.get('api/basket', {params: {userId}})
    return data
}
