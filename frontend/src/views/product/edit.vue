<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 overflow-y-auto p-6 bg-mainBg">
 <div class="w-full mx-auto flex flex-col gap-6">
  <div class="flex justify-between items-center">
   <h2 class="text-2xl font-bold text-gray-800">
    商品编辑
   </h2>
   <div class="flex gap-3">
    <button class="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded shadow-sm text-sm font-medium transition-colors text-red-500 hover:text-red-700" onclick="window.location.href='admin-product-management.html'">
     取消
    </button>
    <button class="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded shadow-sm text-sm font-medium transition-colors" onclick="saveProduct()">
     保存并发布
    </button>
   </div>
  </div>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
   <div class="p-6 space-y-6">
    <!-- 基本信息 -->
    <div class="border-b border-gray-100 pb-6">
     <h3 class="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary pl-3">
      基本信息
     </h3>
     <div class="grid grid-cols-2 gap-6">
      <div>
       <label class="block text-sm font-medium text-gray-700 mb-2">
        商品名称
        <span class="text-red-500">
         *
        </span>
       </label>
       <input class="w-full text-sm border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" placeholder="输入商品名称" type="text" value="先锋一号"/>
      </div>
      <div>
       <label class="block text-sm font-medium text-gray-700 mb-2">
        商品类型
        <span class="text-red-500">
         *
        </span>
       </label>
       <select class="w-full text-sm border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white">
        <option selected="" value="virtual">
         虚拟商品
        </option>
        <option value="physical">
         实体商品
        </option>
       </select>
      </div>
     </div>
     <div class="mt-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
       商品简介
       <span class="text-red-500">
        *
       </span>
      </label>
      <textarea class="w-full text-sm border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y min-h-[100px]" placeholder="输入商品简介，将展示在客户端商品列表卡片中" rows="3">顶级量化团队操盘，采用多因子对冲策略，穿越牛熊周期，为您提供稳健增值服务。</textarea>
     </div>
     <div class="grid grid-cols-2 gap-6 mt-6">
      <div>
       <label class="block text-sm font-medium text-gray-700 mb-2">
        支持支付方式
        <span class="text-red-500">
         *
        </span>
       </label>
       <div class="flex gap-4 mt-2">
        <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
         <input checked="" class="rounded text-primary focus:ring-primary" disabled="" type="checkbox"/>
         余额购买
        </label>
       </div>
       <p class="text-xs text-gray-400 mt-1">
        目前仅支持余额购买
       </p>
      </div>
      <div>
       <label class="block text-sm font-medium text-gray-700 mb-2">
        上架状态
       </label>
       <div class="flex flex-col gap-3 mt-2">
        <div class="flex gap-4">
         <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input checked="" class="text-primary focus:ring-primary" name="status" onchange="toggleScheduleTime(this.value)" type="radio" value="immediate"/>
          立即上架
         </label>
         <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input class="text-primary focus:ring-primary" name="status" onchange="toggleScheduleTime(this.value)" type="radio" value="offline"/>
          暂不上架
         </label>
         <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input class="text-primary focus:ring-primary" name="status" onchange="toggleScheduleTime(this.value)" type="radio" value="scheduled"/>
          定时上架
         </label>
        </div>
        <!-- 定时上架时间选择器 (默认隐藏) -->
        <div class="hidden mt-1 w-64" id="schedule-time-container">
         <input class="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" type="datetime-local"/>
         <p class="text-xs text-gray-500 mt-1">
          请选择到达该时间后自动上架
         </p>
        </div>
       </div>
      </div>
     </div>
    </div>
    <!-- 商品图片 -->
    <div class="border-b border-gray-100 pb-6">
     <h3 class="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary pl-3">
      商品图片
     </h3>
     <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 列表展示图片 -->
      <div>
       <label class="block text-sm font-medium text-gray-700 mb-2">
        列表展示图片
        <span class="text-red-500">
         *
        </span>
       </label>
       <p class="text-xs text-gray-500 mb-3">
        与前端商品卡片顶部封面保持比例，建议尺寸 600x250 (约为 2.4:1)，支持 jpg、png、webp 格式。
       </p>
       <div class="w-48 h-20 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center cursor-pointer relative group">
        <i class="fas fa-cloud-upload-alt text-xl text-gray-400 mb-1 group-hover:text-primary transition-colors">
        </i>
        <span class="text-[10px] text-gray-500 group-hover:text-primary transition-colors">
         上传封面图
        </span>
        <!-- 隐藏的 input -->
        <input accept="image/png, image/jpeg, image/webp" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file"/>
       </div>
      </div>
      <!-- 商品轮播图 -->
      <div>
       <label class="block text-sm font-medium text-gray-700 mb-2">
        商品详情轮播图
        <span class="text-red-500">
         *
        </span>
       </label>
       <p class="text-xs text-gray-500 mb-3">
        最多可上传 3 张图片，建议尺寸 800x800，第一张将作为商品主图。
       </p>
       <div class="flex gap-4">
        <!-- 图片上传槽位 1 -->
        <div class="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center cursor-pointer relative group">
         <i class="fas fa-plus text-gray-400 group-hover:text-primary transition-colors">
         </i>
         <span class="text-[10px] text-gray-500 mt-1">
          主图
         </span>
         <input accept="image/png, image/jpeg, image/webp" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file"/>
        </div>
        <!-- 图片上传槽位 2 -->
        <div class="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center cursor-pointer relative group">
         <i class="fas fa-plus text-gray-400 group-hover:text-primary transition-colors">
         </i>
         <input accept="image/png, image/jpeg, image/webp" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file"/>
        </div>
        <!-- 图片上传槽位 3 -->
        <div class="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center cursor-pointer relative group">
         <i class="fas fa-plus text-gray-400 group-hover:text-primary transition-colors">
         </i>
         <input accept="image/png, image/jpeg, image/webp" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file"/>
        </div>
       </div>
      </div>
     </div>
    </div>
    <!-- 多套餐配置 -->
    <div class="border-b border-gray-100 pb-6">
     <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-bold text-gray-800 border-l-4 border-primary pl-3">
       多套餐配置
      </h3>
      <button class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium transition-colors flex items-center gap-1.5" onclick="addPackageRow()" type="button">
       <i class="fas fa-plus text-xs">
       </i>
       添加套餐
      </button>
     </div>
     <div class="space-y-4" id="package_list">
      <!-- 默认第一条套餐 -->
      <div class="p-5 border border-gray-200 rounded-lg bg-gray-50 relative group package-item">
       <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
         <label class="block text-xs font-medium text-gray-700 mb-1">
          套餐名称
          <span class="text-red-500">
           *
          </span>
         </label>
         <input class="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" placeholder="如: 基础版" type="text" value="基础版"/>
        </div>
        <div>
         <label class="block text-xs font-medium text-gray-700 mb-1">
          商品规格
          <span class="text-red-500">
           *
          </span>
         </label>
         <select class="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white">
          <option value="buyout">
           无时间限制
          </option>
          <option value="day">
           /天（订阅）
          </option>
          <option value="week">
           /周（订阅）
          </option>
          <option selected="" value="month">
           /月（订阅）
          </option>
          <option value="year">
           /年（订阅）
          </option>
         </select>
        </div>
        <div>
         <label class="block text-xs font-medium text-gray-700 mb-1">
          原价 (USD)
          <span class="text-red-500">
           *
          </span>
         </label>
         <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
           <span class="text-gray-500 text-sm">
            $
           </span>
          </div>
          <input class="w-full text-sm border border-gray-300 rounded pl-6 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" placeholder="0.00" type="number" value="6000.00"/>
         </div>
        </div>
        <div>
         <label class="block text-xs font-medium text-gray-700 mb-1">
          优惠价 (USD)
          <span class="text-red-500">
           *
          </span>
         </label>
         <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
           <span class="text-gray-500 text-sm">
            $
           </span>
          </div>
          <input class="w-full text-sm border border-gray-300 rounded pl-6 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" placeholder="0.00" type="number" value="5000.00"/>
         </div>
        </div>
        <div>
         <label class="block text-xs font-medium text-gray-700 mb-1">
          库存数量
          <span class="text-red-500">
           *
          </span>
         </label>
         <input class="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" placeholder="默认999" type="number" value="999"/>
        </div>
        <div class="col-span-3">
         <label class="block text-xs font-medium text-gray-700 mb-1">
          限购份数 (可选)
         </label>
         <input class="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" placeholder="如不限购请留空" type="number"/>
        </div>
       </div>
      </div>
     </div>
    </div>
    <!-- 商品详细介绍 (富文本) -->
    <div>
     <h3 class="text-lg font-bold text-gray-800 mb-4 border-l-4 border-primary pl-3">
      商品详细介绍
     </h3>
     <div class="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <!-- Quill Editor Container -->
      <div class="h-64" id="editor-container">
       <p>
        欢迎购买先锋一号商品...
       </p>
      </div>
     </div>
     <p class="text-xs text-gray-500 mt-2">
      支持图文排版，该内容将展示在客户端商品详情页中。
     </p>
    </div>
   </div>
  </div>
 </div>
</main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
