import request from '../utils/request'

export default {
    saveLocation(locationDTO) {
        return request({
            url: '/api/location-save',
            method: 'post',
            data: locationDTO
        })
    },

    updateLocation(locationDTO) {
        return request({
            url: '/api/location-save',
            method: 'post',
            data: locationDTO
        })
    },

    updateStatusLocation(locationDTO) {
        return request({
            url: '/api/location-save',
            method: 'post',
            data: locationDTO
        })
    },

    findAllLocation() {
        return request({
            url: '/api/location/all',
            method: 'get'
        })
    },

    findListOfLocation(query) {
        return request({
            url: '/api/location/pagination/all',
            params: query,
            method: 'get'
        })
    },

    retrieveLocationById(id) {
        return request({
            url: '/api/location/id/' + id,
            method: 'get'
        })
    },
}
