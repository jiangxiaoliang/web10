<template>
    <div>
        {{msg}}
        <div>
            <input type="text" placeholder="请输入新特性" @keyup.enter="addFeature" />
        </div>
        <ul>
            <li v-for="feature in features" :key="feature.id">{{feature.name}}</li>
            <li>{{count}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch,　Emit } from 'vue-property-decorator';

    interface Feature {
        id: number;
        name: string;
        version: string;
    }
    // 泛型
    interface Result<T> {
        ok: 0 | 1,
        data: T[]
    }

    function getData<T>(): Result<T> {
        const data: any[] = [
            { id: 1, name: '类型注解', version: '2.0' },
            { id: 2, name: '编译型语言', version: '1.0' }
        ];
        return { ok: 1, data };
    }

    @Component({
        props: {
            // 属性也可以在这里配置
            name: {
                type: String,
                default: '匿名'
            }
        }
    })
    export default class Hello extends Vue {
        @Prop({ required: true, type: String }) private msg!: string
        // data
        // private features = [1, 2, 3]
        private features!: Feature[]

        // 生命周期
        private created() {
            this.features = getData<Feature>().data // 无法监听
        }
        // method
        @Emit()
        private addFeature(event: any) {
            const feature = {
                id: this.features.length + 1,
                name: event.target.value,
                version: '2.0'
            }
            this.features.push(feature)
            event.target.value = ''
            return feature
        }

        @Watch('features', { deep: true })
        private featuresChange(val: string, oldVal: string) {
            console.log(val, oldVal)
        }

        // computed
        get count() {
            return this.features.length
        }
    }
</script>

<style scoped>

</style>