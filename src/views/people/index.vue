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
                                    :data="peopleList"
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
                                        :limit.sync="listQuery.pageSize" @pagination="getAllPeopleList"/>


                            <!-- Add and Edit dialog start-->

                            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
                                <el-card shadow="never">
                                    <el-form ref="dataForm" :model="peopleDTO" :rules="rules"
                                             label-width="190px">

                                        <el-form-item label="People Name" prop="peopleName">
                                            <el-input v-model="peopleDTO.peopleName" type="text"
                                                      placeholder="Enter name"/>
                                        </el-form-item>

                                        <el-form-item label="People Location" prop="peopleLocation">
                                            <el-input v-model="peopleDTO.peopleLocation" type="text"
                                                      placeholder="Enter Location"/>
                                        </el-form-item>

                                        <el-form-item label="PhoneNumber" prop="phoneNumber">
                                            <el-input v-model="peopleDTO.phoneNumber" type="number"
                                                      placeholder="Enter phoneNumber"/>
                                        </el-form-item>

                                        <el-form-item label="Email" prop="email">
                                            <el-input v-model="peopleDTO.email" type="email"
                                                      placeholder="Enter phoneNumber"/>
                                        </el-form-item>

                                        <el-form-item v-if="dialogStatus==='create'" label="Status" prop="status">
                                            <el-select v-model="peopleDTO.status" placeholder="">
                                                <el-option value="ACTIVE">ACTIVE</el-option>
                                                <el-option value="INACTIVE">InACTIVE</el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item>
                                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                                            <el-button
                                                    type="primary"
                                                    @click="dialogStatus==='create'?createPeople(peopleDTO): updatePeople(peopleDTO)"
                                            >
                                                Confirm
                                            </el-button>
                                        </el-form-item>

                                    </el-form>
                                </el-card>

                            </el-dialog>
                            <!--       Add and edit dialog End-->

                        </div>

                        <div v-if="showDetail===true" class="people-container">
                            <el-button type="primary" @click="goBack()" class="btn btn-info"> Back</el-button>
                            <br>
                            &nbsp;
                            <table class="table-striped table" id="people-table">
                                <tbody>
                                <tr>
                                    <td> Id</td>
                                    <th>{{peopleDTO.id}}</th>
                                </tr>

                                <tr>
                                    <td> People Name</td>
                                    <th>{{peopleDTO.peopleName}}</th>
                                </tr>


                                <tr>
                                    <td> Location</td>
                                    <th>{{peopleDTO.peopleLocation}}</th>
                                </tr>

                                <tr>
                                    <td> Phone Number</td>
                                    <th>{{peopleDTO.phoneNumber}}</th>
                                </tr>

                                <tr>
                                    <td> email</td>
                                    <th>{{peopleDTO.email}}</th>
                                </tr>

                                <tr>
                                    <td> Created Date</td>
                                    <th>{{peopleDTO.created | formatDate}}</th>
                                </tr>

                                <tr>
                                    <td> Last Modified Date</td>
                                    <th>{{peopleDTO.lastModified | formatDate}}</th>
                                </tr>

                                <tr>
                                    <td>Status</td>
                                    <th>{{peopleDTO.status}}</th>
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
    import api from '../../api/people-api'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    Vue.use(ToggleButton)
    export default {
        name: 'People',
        components: {sidebar, Pagination},
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                },

                columns: [
                    {label: 'Id', prop: 'id', sortable: true, minWidth: 80},
                    {label: 'People Name', prop: 'peopleName', sortable: true, minWidth: 150},
                    {label: 'People Location', prop: 'peopleLocation', sortable: true, minWidth: 150},
                    {label: 'Phone Number', prop: 'phoneNumber', sortable: true, minWidth: 150},
                    {label: 'Status', prop: 'status', sortable: true, minWidth: 120}
                ],
                showDetail: false,
                peopleDTO: {
                    id: '',
                    peopleName: '',
                    peopleLocation: '',
                    phoneNumber: '',
                    email: '',
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
                peopleList: [],
                dialogFormVisible: false,
                filterText: null,
                dialogStatus: '',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                rules: {
                    // Add form validation message
                    peopleName: [
                        {required: true, message: 'Please enter people name', trigger: 'blur'}
                    ],
                    peopleLocation: [
                        {required: true, message: 'Please enter people location', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: 'Please enter status', trigger: 'blur'}
                    ],
                    phoneNumber: [
                        {required: true, message: 'Please phone number', trigger: 'blur'}
                    ]
                },
                downloadLoading: false
            }
        },
        created() {
            this.getAllPeopleList();
        },
        methods: {
            goBack() {
                this.showDetail = false
            },

            handleCreate() {
                this.resetPeople()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },

            createPeople(peopleDTO) {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.savePeople(peopleDTO).then(response => {
                            this.response = response.data
                            console.log(response.data)
                            this.getAllPeopleList()
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
                this.retrievePeople(row.id)
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },

            updatePeople(peopleDTO) {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        api.updatePeople(peopleDTO).then(response => {
                            this.response = response.data
                            console.log(response.data)
                            this.getAllPeopleList()
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

                    api.updateStatusPeople(row).then(response => {
                        this.response = response.data
                        console.log(this.response)
                        this.$notify({
                            title: 'success',
                            message: 'CAMERA INACTIVE',
                            type: 'success'
                        })
                    })
                } else {
                    row.status = 'ACTIVE'

                    api.updateStatusPeople(row).then(response => {
                        this.response = response.data
                        console.log(this.response)
                        this.$notify({
                            title: 'success',
                            message: 'CAMERA ACTIVE',
                            type: 'success'
                        })
                    })
                }
            },

            showProfile(row) {
                this.showDetail = true
                api.retrievePeopleById(row.id).then(response => {
                    this.peopleDTO = response.data
                })
            },

            getAllPeopleList() {
                this.loading = true;
                api.findListOfPeople(this.listQuery).then(response => {
                    this.peopleList = response.data.totalElement
                    this.loading = false;
                    console.log(this.peopleList)
                    this.total = response.data.totalPage;
                })
            },

            retrievePeople(id) {
                console.log(id)
                api.retrievePeopleById(id).then(response => {
                    this.peopleDTO = response.data
                    console.log(this.peopleDTO)
                })
            },

            resetPeople() {
                this.peopleDTO = {}
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

            // handleDownload() {
            //     this.downloadLoading = true
            //     import('@/vendor/Export2Excel').then(excel => {
            //         console.log(this.list)
            //         const tHeader = ['Id', 'title', 'content', 'Status', 'createdBy', 'createdD']
            //         const filterVal = ['id', 'nameEnglish', 'nameNepali', 'status', 'descriptionEnglish', 'descriptionNepali']
            //         const data = this.formatJson(filterVal, this. labList)
            //         excel.export_json_to_excel({
            //             header: tHeader,
            //             data,
            //             filename: 'Category-list'
            //         })
            //         this.downloadLoading = false
            //     })
            // },
            // formatJson(filterVal, jsonData) {
            //     return jsonData.map(v => filterVal.map(j => {
            //         if (j === 'id') {
            //             return v.id
            //         } else if (j === 'nameEnglish') {
            //             return v.nameEnglish
            //         } else if (j === 'nameNepali') {
            //             return v.nameNepali
            //         } else if (j === 'status') {
            //             return v.status
            //         } else if (j === 'descriptionEnglish') {
            //             return v.descriptionEnglish
            //         } else if (j === 'descriptionNepali') {
            //             return v.descriptionNepali
            //         } else {
            //             return v[j]
            //         }
            //
            //     }))
            // }
        }
    }
</script>

<style scoped>
    .status-button {
        padding-top: 5px;
    }

    .people-container {
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

    #people-table {
        border-collapse: collapse;
        width: 100%;
    }

    #people-table td, #people-table th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #people-table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    #people-table tr:hover {
        background-color: #ddd;
    }

    #people-table th {
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
