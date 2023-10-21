<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}  {{ name }}</text>
     12313
		</view>
	</view>
</template>

<script>
/**
 * @name 个人中心
 * */ 
const { VUE_APP_TITLE } = process.env;
import { getUrlParams } from '@/utils/page/url';
	export default {
		data() {
			return {
				title: '这里是个人中心页面',
        name:VUE_APP_TITLE,
			}
		},
		onLoad() {
      console.log(getUrlParams('id'))
		},
		methods: {

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
		color: #8f8f94;
	}
</style>
