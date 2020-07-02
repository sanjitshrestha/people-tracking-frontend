import request from '../utils/request'

export default {
    saveCamera(cameraDTO) {
        return request({
            url: '/api/camera-save',
            method: 'post',
            data: cameraDTO
        })
    },

    updateCamera(cameraDTO) {
        return request({
            url: '/api/camera-save',
            method: 'post',
            data: cameraDTO
        })
    },

    updateStatusCamera(cameraDTO) {
        return request({
            url: '/api/camera-save',
            method: 'post',
            data: cameraDTO
        })
    },

    findAllCamera() {
        return request({
            url: '/api/camera/all',
            method: 'get'
        })
    },

    findListOfCamera(query) {
        return request({
            url: '/api/camera/pagination/all',
            params: query,
            method: 'get'
        })
    },

    retrieveCameraById(id) {
        return request({
            url: '/api/camera/id/' + id,
            method: 'get'
        })
    },

    retrieveCameraByLocationId(id) {
        return request({
            url: '/api/location/filter/' + id,
            method: 'get'
        })
    },
}
