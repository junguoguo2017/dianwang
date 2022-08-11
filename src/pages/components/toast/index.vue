<template>
    <div v-if="showToast">
        <div class="toast" :class="position">
            <div class="toast_container" v-if="type == 'text'">
                <div class="msg_container">{{ message }}</div>
            </div>
            <div class="toast_container" v-if="type == 'success'">
                <div><img src="./check.png" alt="" style="width: 1rem" /></div>
                <div class="msg_container">{{ message }}</div>
            </div>
            <div class="toast_container" v-if="type == 'fail'">
                <div><img src="./fail.png" alt="" style="width: 1rem" /></div>
                <div class="msg_container">{{ message }}</div>
            </div>
            <div class="toast_container" v-if="type == 'loading'">
                <div>
                    <img
                        class="toastLoding"
                        src="./loading.png"
                        alt=""
                        style="width: 1rem"
                    />
                </div>
                <div class="msg_container">{{ message }}</div>
            </div>
        </div>
        <div
            class="marker"
            v-if="forbidClick || mask"
            :class="mask ? 'markerBg' : ''"
            @touchmove.prevent
        ></div>
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: "",
        },
        type: {
            validator: function (value) {
                // 值必须是这些字符串中的一个
                return (
                    ["text", "success", "fail", "loading"].indexOf(value) !== -1
                );
            },
            default: "text",
        },
        duration: {
            type: Number,
            default: 2000,
        },
        position: {
            type: String,
            default: "middle",
        },
        mask: {
            //显示蒙层
            type: Boolean,
            default: false,
        },
        forbidClick: {
            //禁止点击
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showToast: false,
        };
    },

    methods: {},
};
</script>

<style scoped>
.marker {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9998;
}
.markerBg {
    background: rgba(0, 0, 0, 0.4);
}
.toast {
    width: 100%;
    text-align: center;
    position: fixed;
    z-index: 9999;
}
.toast_container {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0.16rem;
    display: inline-block;
    color: #fff;
    text-align: center;
    padding: 0.2rem;
    box-sizing: border-box;
    min-width: 2.8rem;
    max-width: 3.5rem;
}
.top {
    top: 10%;
}
.middle {
    top: 40%;
}
.bottom {
    top: 70%;
}
.msg_container {
    font-size: 0.3rem;
    word-wrap: break-word;
}
.icon {
    font-size: 0.6rem;
}
.toastLoding {
    animation: runRotate 2s linear infinite;
}
@-webkit-keyframes runRotate {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
