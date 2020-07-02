<template>
    <div id="sidebar-wrapper">
        <div class="sidebar-toggler">
            <div class="navbox">
                <div class="toggler-icon"><i class="icon1x icon-menu menu-toggle"></i></div>
                <div class="brand">
                    <img src="@/images/logo.png">
                </div>
            </div>
            <div class="sidebar">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link active" @click="toDashboard()"><i
                            class="icon1x icon-dashboard"></i><span>Dashboard</span></a></li>

                    <li class="nav-item"><a class="nav-link" @click="toLocation()"><i
                            class="icon1x icon-location"></i><span>Location</span></a></li>

                    <li class="nav-item"><a class="nav-link" @click="toCamera()"><i
                            class="icon1x icon-camera"></i><span>Camera</span></a></li>

                    <li class="nav-item"><a class="nav-link" @click="toPeople()"><i
                            class="icon1x icon-users"></i><span>People</span></a></li>

                    <li class="nav-item"><a class="nav-link" @click="toPeopleRecord()"><i
                            class="icon1x icon-record"></i><span>People Record</span></a></li>

                    <li class="nav-item"><a class="nav-link" @click="handleLogout"><i
                            class="icon1x icon-logout"></i><span>Log Out</span></a>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {removeUsername} from "../../utils/auth";
    import Vue from "vue";
    import $ from "jquery";

    export default {
        name: "Sidebar",

        data() {
            return {
                toDashboard() {
                    this.$router.push('/dashboard')
                },

                toLocation() {
                    this.$router.push('/location')
                },

                toCamera(){
                    this.$router.push('/camera')
                },

                toPeople(){
                    this.$router.push('/people')
                },

                toPeopleRecord(){
                    this.$router.push('/people-record')
                }

            }
        },

        methods: {
            handleLogout() {
                this.$store.dispatch('user/logout').then(() => {
                    this.loggedIn = false
                    removeUsername();
                    this.$router.push('login')
                    Vue.notify({
                        group: 'alert-message',
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully Logged Out'
                    })
                })
            }
        },

        mounted() {
            $(document).ready(function () {
                $(".menu-toggle").click(function (e) {
                    e.preventDefault();
                    $("#wrapper").toggleClass("toggled");
                });
            });

            $('.nav-item ul').hide();
            $(".nav-item a").click(function () {
                $(this).parent(".nav-item").children("ul").slideToggle("100");
                $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
            });
        }
    }
</script>

<style scoped>
    .nav-link {
        cursor: pointer;
    }

    .sub-menu {
        list-style: none;
    }

    .sub-menu li {
        padding: 4px;
        cursor: pointer;
        border-left: 4px solid transparent;
    }

    .sub-menu li:hover {
        background: #ebebeb;
        padding: 4px;
        cursor: pointer;
        border-left: 4px solid #20bdbe;
    }

    .right {
        margin-left: .5rem;
    }
</style>
