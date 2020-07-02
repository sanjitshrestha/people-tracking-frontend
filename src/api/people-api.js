import request from '../utils/request'

export default {
    savePeople(peopleDTO) {
        return request({
            url: '/api/people-save',
            method: 'post',
            data: peopleDTO
        })
    },

    updatePeople(peopleDTO) {
        return request({
            url: '/api/people-save',
            method: 'post',
            data: peopleDTO
        })
    },

    updateStatusPeople(peopleDTO) {
        return request({
            url: '/api/people-save',
            method: 'post',
            data: peopleDTO
        })
    },

    findAllPeople() {
        return request({
            url: '/api/people/all',
            method: 'get'
        })
    },

    findListOfPeople(query) {
        return request({
            url: '/api/people/pagination/all',
            params: query,
            method: 'get'
        })
    },

    retrievePeopleById(id) {
        return request({
            url: '/api/people/id/' + id,
            method: 'get'
        })
    },
}
