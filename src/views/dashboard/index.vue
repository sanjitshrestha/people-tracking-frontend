<template>

    <div id="wrapper">

<!--        sidebar component for admin dashboard-->
        <sidebar/>
<!--        sidebar component end here and is store in layout folder-->

    <div id="page-content-wrapper">

        <div id="content">

            <navbar></navbar>

        <div class="app-content">
            <div class="app-header">
                <div class="app-title">
                    <h4>Welcome to People Tracking System</h4>
                </div>

                <div class="app-option ml-md-auto">
                    <div class="app-search">
                        <input class="form-control" type="text" placeholder="Search here..">
                    </div>
                </div>
            </div>
            <div class="dashboard-page">
                <div class="container">
                    <div class="row text-center">
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">81917</h5>
                                    <p class="card-text">User</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">71838</h5>
                                    <p class="card-text">Farmers</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">38313</h5>
                                    <p class="card-text">Buyers</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">82584</h5>
                                    <p class="card-text">Business</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">43847</h5>
                                    <p class="card-text">Orders</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">1214</h5>
                                    <p class="card-text">Catagories</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">36829</h5>
                                    <p class="card-text">Quatity Type</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">35491</h5>
                                    <p class="card-text">Products</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">81730</h5>
                                    <p class="card-text">Videos</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">48033</h5>
                                    <p class="card-text">Loan Request</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">8499</h5>
                                    <p class="card-text">Resources</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">tag</h5>
                                    <p class="card-text">text</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    </div>
</template>

<script>
    import sidebar from "@/layout/components/sidebar";
    import navbar from "../../layout/components/navbar"

    export default {
        name: "Dashboard",
        components: { sidebar, navbar },
        data(){
            return{

            }
        },
        mounted() {
            if (localStorage.getItem('reloaded')) {
                // The page was just reloaded. Clear the value from local storage
                // so that it will reload the next time this page is visited.
                localStorage.removeItem('reloaded');
            } else {
                // Set a flag so that we know not to reload the page twice.
                localStorage.setItem('reloaded', '1');
                location.reload();
            }
        }

    }
</script>

<style scoped>
</style>
