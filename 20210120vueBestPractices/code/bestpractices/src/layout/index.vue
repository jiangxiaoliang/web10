<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <Breadcrumb></Breadcrumb>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/sideBar'
import Breadcrumb from '@/components/Breadcrumb'

export default {
    components: {
        Sidebar,
        Breadcrumb
    }
}
</script>