<template>
    <div>
        <div id="wrapper">

            <!-- Sidebar -->
            <sidebar/>
            <!-- End of Sidebar -->

            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">

                <!-- Main Content -->
                <div id="content">

                    <div class="app-container">
                        <div class="filter-container">
                            <el-button v-if="showDetail===false" type="primary" @click="handleCreate">
                                Add
                            </el-button>
                            <el-button
                                    v-if="showDetail===false"
                                    :loading="downloadLoading"
                                    type="primary"
                                    icon="el-icon-download"
                                    @click="handleDownload"
                            >
                                Export
                            </el-button>
                            &nbsp;
                            <el-input
                                    v-if="showDetail===false"
                                    v-model="filterText"
                                    placeholder="Search"
                                    style="width: 20%"
                                    prefix-icon="el-icon-search"
                                    @keyup.native="filterTable"
                            />

                        </div>
                        <div v-if="showDetail===false">
                            <el-table
                                    ref="tableRef"
                                    :data="peopleRecordList"
                                    v-loading="loading"
                                    element-loading-text="Loading..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.1);"
                                    style="width: 100%"
                                    border
                                    fit
                                    highlight-current-row
                            >

                                <el-table-column
                                        v-for="column in columns"
                                        :key="column.label"
                                        :prop="column.prop"
                                        align="center"
                                        :label="column.label"
                                        :sortable="column.sortable"
                                        :formatter="column.formatter"
                                        :min-width="column.minWidth"
                                />
                                <el-table-column label="Actions" width="200px">

                                    <template slot-scope="{row}">
                                        <el-button type="primary" size="mini" @click="handleUpdate(row)">
                                            Edit
                                        </el-button>
                                        <el-button type="primary" size="mini" @click="showProfile(row)">
                                            View Details
                                        </el-button>
                                        <div v-if="row.status==='ACTIVE'">
                                            <toggle-button class="status-button" value="true"
                                                           @change="changeStatus(row)"/>
                                        </div>
                                        <div v-else-if="row.status==='INACTIVE'">
                                            <toggle-button class="status-button" @change="changeStatus(row)"/>
                                        </div>

                                    </template>

                                </el-table-column>
                            </el-table>

                            <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo"
                                        :limit.sync="listQuery.pageSize" @pagination="getAllPeopleRecordList()"/>


                            <!-- Add and Edit dialog start-->

                            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
                                <el-card shadow="never">
                                    <el-form ref="dataForm" :model="peopleRecordDTO" :rules="rules"
                                             label-width="190px">

                                        <el-form-item label="Location" prop="locationId">
                                            <el-select v-model="locationList.id"
                                                       @change="getCameraByLocation(locationList.id)" placeholder="">
                                                <el-option v-for="location in locationList" :key="location.id"
                                                           :label="location.streetAddress"
                                                           :value="location.id">{{location.streetAddress}}
                                                </el-option>

                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="Camera" prop="cameraId">
                                            <el-select v-model="peopleRecordDTO.cameraId" placeholder="">
                                                <el-option v-for="camera in cameraByLocation" :key="camera.id"
                                                           :value="camera.id" :label="camera.cameraName">
                                                    {{camera.cameraName}}
                                                </el-option>

                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="People" prop="peopleId">
                                            <el-select v-model="peopleRecordDTO.peopleId" placeholder="">
                                                <el-option v-for="people in peopleList" :key="people.id"
                                                           :value="people.id" :label="people.peopleName">
                                                    {{people.peopleName}}
                                                </el-option>

                                            </el-select>
                                        </el-form-item>


                                        <el-form-item label="Description" prop="description">
                                            <ckeditor
                                                    v-model="peopleRecordDTO.description"
                                                    :editor="editor"
                                                    :config="editorConfig"
                                            />
                                        </el-form-item>

                                        <el-form-item v-if="dialogStatus==='create'" label="Status" prop="status">
                                            <el-select v-model="peopleRecordDTO.status" placeholder="">
                                                <el-option value="ACTIVE">ACTIVE</el-option>
                                                <el-option value="INACTIVE">InACTIVE</el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item>
                                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                                            <el-button
                                                    type="primary"
                                                    @click="dialogStatus==='create'?createPeopleRecord(peopleRecordDTO): updatePeopleRecord(peopleRecordDTO)"
                                            >
                                                Confirm
                                            </el-button>
                                        </el-form-item>

                                    </el-form>
                                </el-card>

                            </el-dialog>
                            <!--       Add and edit dialog End-->

                        </div>

                        <div v-if="showDetail===true" class="camera-container">
                            <el-button type="primary" @click="goBack()" class="btn btn-info"> Back</el-button>
                            <br>
                            &nbsp;
                            <table class="table-striped table" id="camera-table">
                                <tbody>
                                <tr>
                                    <td> Id</td>
                                    <th>{{peopleRecordDTO.id}}</th>
                                </tr>

                                <tr>
                                    <td> Camera Name</td>
                                    <th>{{peopleRecordDTO.cameraName}}</th>
                                </tr>


                                <tr>
                                    <td> People Name</td>
                                    <th>{{peopleRecordDTO.peopleName}}</th>
                                </tr>

                                <tr>
                                    <td> Description</td>
                                    <th v-html="peopleRecordDTO.description"></th>
                                </tr>

                                <tr>
                                    <td> Created Date</td>
                                    <th>{{peopleRecordDTO.created | formatDate}}</th>
                                </tr>

                                <tr>
                                    <td> Last Modified Date</td>
                                    <th>{{peopleRecordDTO.lastModified | formatDate}}</th>
                                </tr>

                                <tr>
                                    <td>Status</td>
                                    <th>{{peopleRecordDTO.status}}</th>
                                </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"/>
        </a>

        <!-- Logout Modal-->
        <navbar/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import ToggleButton from 'vue-js-toggle-button'
    import sidebar from "../../layout/components/sidebar";
    import Pagination from "../../layout/components/pagination"
    import api from '../../api/people-record-api'
    import cameraapi from '../../api/camera-api'
    import locationapi from '../../api/location-api'
    import peopleapi from '../../api/people-api'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    Vue.use(ToggleButton)
    export default {
        name: 'Camera',
        components: {sidebar, Pagination},
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                },

                columns: [
                    {label: 'Id', prop: 'id', sortable: true, minWidth: 80},
                    {label: 'Camera Name', prop: 'cameraName', sortable: true, minWidth: 150},
                    {label: 'People Name', prop: 'peopleName', sortable: true, minWidth: 150},
                    {label: 'Status', prop: 'status', sortable: true, minWidth: 120}
                ],
                showDetail: false,
                peopleRecordDTO: {
                    id: '',
                    cameraId: '',
                    cameraName: '',
                    peopleId: '',
                    peopleName: '',
                    description: '',
                    created: '',
                    lastModified: '',
                    status: '',
                },

                listQuery: {
                    pageNo: 1,
                    pageSize: 10
                },

                total: 0,
                loading: true,
                cameraList: [],
                locationList: [],
                peopleRecordList: [],
                peopleList: [],
                recordList:[],
                cameraByLocation: [],
                dialogFormVisible: false,
                filterText: null,
                dialogStatus: '',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                rules: {
                    // Add form validation message
                    cameraId: [
                        {required: true, message: 'Please select camera', trigger: 'blur'}
                    ],
                    peopleId: [
                        {required: true, message: 'Please select people', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: 'Please enter status', trigger: 'blur'}
                    ],
                },
                downloadLoading: false
            }
        },
        created() {
            this.getAllPeopleRecordList();
            this.getAllCameraList();
            this.getLocationList();
            this.getPeopleList();
            this.getAllRecordList();
        },
        methods: {
            goBack() {
                this.showDetail = false
            },

            handleCreate() {
                this.resetPeopleRecord()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },

            createPeopleRecord(peopleRecordDTO) {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.savePeopleRecord(peopleRecordDTO).then(response => {
                            this.response = response.data
                            console.log(response.data)
                            this.getAllPeopleRecordList()
                            this.dialogFormVisible = false
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Added',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            },

            handleUpdate(row) {
                this.retrievePeopleRecord(row.id)
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },

            updatePeopleRecord(peopleRecordDTO) {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.updatePeopleRecord(peopleRecordDTO).then(response => {
                            this.response = response.data
                            console.log(response.data)
                            this.getAllPeopleRecordList()
                            this.dialogFormVisible = false
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Updated',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            },

            changeStatus(row) {
                console.log(row)
                if (row.status === 'ACTIVE') {
                    row.status = 'INACTIVE'

                    api.updateStatusPeopleRecord(row).then(response => {
                        this.response = response.data
                        console.log(this.response)
                        this.$notify({
                            title: 'success',
                            message: 'PEOPLE RECORD INACTIVE',
                            type: 'success'
                        })
                    })
                } else {
                    row.status = 'ACTIVE'

                    api.updateStatusPeopleRecord(row).then(response => {
                        this.response = response.data
                        console.log(this.response)
                        this.$notify({
                            title: 'success',
                            message: 'PEOPLE RECORD ACTIVE',
                            type: 'success'
                        })
                    })
                }
            },

            showProfile(row) {
                this.showDetail = true
                api.retrievePeopleRecordById(row.id).then(response => {
                    this.peopleRecordDTO = response.data
                })
            },

            getAllPeopleRecordList() {
                this.loading = true;
                api.findListOfPeopleRecord(this.listQuery).then(response => {
                    this.peopleRecordList = response.data.totalElement
                    this.loading = false;

                    console.log("---------------")
                    console.log(this.peopleRecordList)
                    this.total = response.data.totalPage;
                })
            },

            getLocationList() {
                locationapi.findAllLocation().then(response => {
                    this.locationList = response.data
                    console.log(this.locationList)
                })
            },

            getCameraByLocation(id) {
                cameraapi.retrieveCameraByLocationId(id).then(response => {
                    this.cameraByLocation = response.data
                    console.log(this.cameraByLocation)
                })
            },

            getAllCameraList() {
                cameraapi.findAllCamera().then(response => {
                    this.cameraList = response.data
                    console.log(this.cameraList)
                })

            },

            getPeopleList() {
                peopleapi.findAllPeople().then(response => {
                    this.peopleList = response.data
                    console.log(this.peopleList)
                })
            },

            retrievePeopleRecord(id) {
                console.log(id)
                api.retrievePeopleRecordById(id).then(response => {
                    this.peopleRecordDTO = response.data
                    console.log(this.peopleRecordDTO)
                })
            },

            getAllRecordList(){
                api.findAllPeopleRecord().then(response => {
                    this.recordList = response.data;
                    console.log(this.recordList)
                })
            },

            resetPeopleRecord() {
                this.peopleRecordDTO = {}
            },

            filterTable() {
                const rows = this.$refs.tableRef.$refs.bodyWrapper.getElementsByClassName(
                    'el-table__row'
                )
                for (const row of rows) {
                    const cells = row.getElementsByTagName('td')
                    for (const cell of cells) {
                        const innerText = cell.innerText.toLowerCase()
                        const filterText = this.filterText.toLowerCase()
                        if (innerText.indexOf(filterText) > -1) {
                            row.style.display = ''
                            break
                        } else {
                            row.style.display = 'none'
                        }
                    }
                }
            },

            handleDownload() {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    console.log(this.list)
                    const tHeader = ['Id', 'cameraName', 'cameraId', 'peopleId', 'peopleName', 'time']
                    const filterVal = ['id', 'cameraName', 'cameraId', 'peopleId', 'peopleName', 'created']
                    const data = this.formatJson(filterVal, this.recordList)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'People Record'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'id') {
                        return v.id
                    } else if (j === 'cameraName') {
                        return v.cameraName
                    } else if (j === 'cameraId') {
                        return v.cameraId
                    } else if (j === 'peopleId') {
                        return v.peopleId
                    } else if (j === 'peopleName') {
                        return v.peopleName
                    } else if (j === 'created') {
                        return v.created
                    } else {
                        return v[j]
                    }

                }))
            }
        }
    }
</script>

<style scoped>
    .status-button {
        padding-top: 5px;
    }

    .camera-container {
        padding-top: 20px;
        width: 80%;
        height: auto;
        margin: 0 auto;
        font-size: 14px;
    }

    #wrapper #content-wrapper {
        background-color: #f8f9fc;
        width: 100%;
        overflow-x: hidden;
    }

    #wrapper #content-wrapper #content {
        flex: 1 0 auto;
    }

    .status-button {
        padding-top: 5px;
    }

    .btn {
        margin-bottom: 1rem;
    }

    #camera-table {
        border-collapse: collapse;
        width: 100%;
    }

    #camera-table td, #camera-table th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #camera-table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    #camera-table tr:hover {
        background-color: #ddd;
    }

    #camera-table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        /*background-color: #20bdbe;*/
        color: #424242;
    }

    td {
        width: 250px;
    }

    img {
        width: 25%;
        height: 25%;
        padding-top: 5px;
    }

    label {
        size: 12px;
        color: #000000;
    }

    b {
        color: #f12121;
    }
</style>
