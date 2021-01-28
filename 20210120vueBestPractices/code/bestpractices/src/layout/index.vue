<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/sideBar'

export default {
    components: {
        Sidebar
    }
}
</script>