<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view>
      {{name}}
			<text class="title">角色：{{role|roleOptionFilterToName }}</text>
      <button @click="handleRouter('my')">跳转个人中心</button>
      <button @click="getProject()">获取列表</button>
      <button @click="getProjectError()">获取异常</button>

		</view>
	</view>
</template>

<script>
import {JumpRouter} from "@/utils/page/router.js";
import {GetProjectList,GetProjectError} from "@/api/project.js";
const { VUE_APP_TITLE } = process.env;
	export default {
		data() {
			return {
				title: 'Hello',
        name:VUE_APP_TITLE,
        role:1
			}
		},
		onLoad() {
		},
		methods: {
      handleRouter(key) {
        JumpRouter(key);
      },
      getProject() {
        GetProjectList();
      },
      getProjectError() {
        GetProjectError()
      }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: var(--primary-white);
	}
</style>
