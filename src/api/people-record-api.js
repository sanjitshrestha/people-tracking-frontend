import request from '../utils/request'

export default {
    savePeopleRecord(peopleRecordDTO) {
        return request({
            url: '/api/people-record/save',
            method: 'post',
            data: peopleRecordDTO
        })
    },

    updatePeopleRecord(peopleRecordDTO) {
        return request({
            url: '/api/people-record/save',
            method: 'post',
            data: peopleRecordDTO
        })
    },

    updateStatusPeopleRecord(peopleRecordDTO) {
        return request({
            url: '/api/people-record/save',
            method: 'post',
            data: peopleRecordDTO
        })
    },

    findAllPeopleRecord() {
        return request({
            url: '/api/people-record/all',
            method: 'get'
        })
    },

    findListOfPeopleRecord(query) {
        return request({
            url: '/api/people-record/pagination/all',
            params: query,
            method: 'get'
        })
    },

    retrievePeopleRecordById(id) {
        return request({
            url: '/api/people-record/id/' + id,
            method: 'get'
        })
    },
}
