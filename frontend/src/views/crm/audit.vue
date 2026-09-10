<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <main class="flex-1 flex flex-col min-w-0">
 <!-- 顶部通栏 -->
 <!-- 主体滚动区 -->
 <main class="flex-1 overflow-y-auto p-6">
  <div class="w-full space-y-6">
   <div class="flex justify-end">
    <a class="text-xs text-blue-500 hover:text-blue-600 transition-colors" data-prd-drawer="" data-prd-title="开户审核详情页面PRD" href="prd-cent-account-page-audit-detail.html">
     查看页面PRD
    </a>
   </div>
   <!-- 审核详情卡片 -->
   <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
    <div class="overflow-hidden rounded-lg border border-gray-100">
     <table class="w-full text-sm">
      <tbody class="divide-y divide-gray-100">
       <tr>
        <td class="w-[14%] bg-gray-50 px-6 py-4 text-gray-500">
         邮箱
        </td>
        <td class="w-[36%] px-6 py-4 text-gray-900 font-medium">
         test-user01@demo.com
        </td>
        <td class="w-[14%] bg-gray-50 px-6 py-4 text-gray-500">
         地区
        </td>
        <td class="w-[36%] px-6 py-4 text-gray-900 font-medium">
         中国
        </td>
       </tr>
       <tr>
        <td class="bg-gray-50 px-6 py-4 text-gray-500">
         真实姓名
        </td>
        <td class="px-6 py-4 text-gray-900 font-medium">
         测试-孙舟
        </td>
        <td class="bg-gray-50 px-6 py-4 text-gray-500">
         证件号码
        </td>
        <td class="px-6 py-4 text-gray-900 font-medium">
         21010219950316****
        </td>
       </tr>
       <tr>
        <td class="bg-gray-50 px-6 py-4 text-gray-500 align-top">
         身份证正面
        </td>
        <td class="px-6 py-4">
         <img alt="身份证正面" class="h-28 w-40 rounded border border-gray-200 object-cover" src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20identity%20document%20front%20photo%20on%20desk%2C%20compliance%20review%20mockup%2C%20sensitive%20information%20blurred%2C%20clean%20office%20lighting%2C%20photorealistic&amp;image_size=portrait_4_3"/>
        </td>
        <td class="bg-gray-50 px-6 py-4 text-gray-500 align-top">
         身份证反面
        </td>
        <td class="px-6 py-4">
         <img alt="身份证反面" class="h-28 w-40 rounded border border-gray-200 object-cover" src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=realistic%20identity%20document%20back%20photo%20on%20desk%2C%20compliance%20review%20mockup%2C%20sensitive%20information%20blurred%2C%20clean%20office%20lighting%2C%20photorealistic&amp;image_size=portrait_4_3"/>
        </td>
       </tr>
       <tr>
        <td class="bg-gray-50 px-6 py-4 text-gray-500">
         手机
        </td>
        <td class="px-6 py-4 text-gray-900 font-medium">
         137****9682
        </td>
        <td class="bg-gray-50 px-6 py-4 text-gray-500">
         推荐人
        </td>
        <td class="px-6 py-4 text-gray-900 font-medium">
         test-刘测试 (ref-demo01@qq.com)
        </td>
       </tr>
       <tr>
        <td class="bg-gray-50 px-6 py-4 text-gray-500 change-highlight">
         MT类型
        </td>
        <td class="px-6 py-4 font-medium change-highlight">
         <span class="audit-type-pill cent">
          美分账户
         </span>
        </td>
        <td class="bg-gray-50 px-6 py-4 text-gray-500">
         备注
        </td>
        <td class="px-6 py-4">
         <div class="flex items-center gap-3">
          <span class="text-gray-900 font-medium">
           暂无备注
          </span>
          <button class="px-3 py-1 border border-blue-300 text-blue-500 text-xs rounded hover:bg-blue-50 transition-colors">
           修改备注
          </button>
         </div>
        </td>
       </tr>
      </tbody>
     </table>
    </div>
    <div class="flex justify-center gap-4 pt-8">
     <button class="px-8 py-2.5 bg-menuActive hover:bg-[#c39a43] text-white font-medium rounded shadow-sm transition-colors text-sm" onclick="openAuditModal()">
      审核
     </button>
     <button class="px-8 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded shadow-sm transition-colors text-sm">
      返回
     </button>
    </div>
   </div>
   <!-- 申请记录卡片 -->
   <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <h3 class="text-base font-bold text-gray-900 mb-4">
     申请记录
    </h3>
    <div class="overflow-x-auto">
     <table class="w-full text-sm text-left text-gray-600 whitespace-nowrap">
      <thead class="text-xs text-gray-500 bg-gray-50 border-b border-gray-200">
       <tr>
        <th class="px-4 py-3 font-medium">
         姓名
        </th>
        <th class="px-4 py-3 font-medium">
         邮箱
        </th>
        <th class="px-4 py-3 font-medium">
         电话
        </th>
        <th class="px-4 py-3 font-medium">
         MT账号
        </th>
        <th class="px-4 py-3 font-medium">
         分组
        </th>
        <th class="px-4 py-3 font-medium change-highlight">
         MT类型
        </th>
        <th class="px-4 py-3 font-medium">
         杠杆
        </th>
        <th class="px-4 py-3 font-medium">
         审核状态
        </th>
        <th class="px-4 py-3 font-medium change-highlight">
         拒绝原因
        </th>
        <th class="px-4 py-3 font-medium change-highlight">
         审核人
        </th>
        <th class="px-4 py-3 font-medium">
         申请时间
        </th>
        <th class="px-4 py-3 font-medium">
         处理时间
        </th>
       </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
       <tr class="hover:bg-gray-50/50">
        <td class="px-4 py-3 text-gray-900">
         测试-孙舟
        </td>
        <td class="px-4 py-3">
         test-user01@demo.com
        </td>
        <td class="px-4 py-3">
         137****9682
        </td>
        <td class="px-4 py-3">
         8300256
        </td>
        <td class="px-4 py-3">
         real\HATC\Inland\Test\Stan
        </td>
        <td class="px-4 py-3 change-highlight">
         <span class="audit-type-pill standard">
          标准账户
         </span>
        </td>
        <td class="px-4 py-3">
         1:100
        </td>
        <td class="px-4 py-3 text-green-600 font-medium">
         已通过
        </td>
        <td class="px-4 py-3 change-highlight">
         -
        </td>
        <td class="px-4 py-3 change-highlight">
         Olivia
        </td>
        <td class="px-4 py-3">
         2026-07-19 09:32:16
        </td>
        <td class="px-4 py-3">
         2026-07-19 09:35:41
        </td>
       </tr>
       <tr class="hover:bg-red-50/50">
        <td class="px-4 py-3 text-gray-900 change-highlight">
         测试-孙舟
        </td>
        <td class="px-4 py-3 change-highlight">
         test-user01@demo.com
        </td>
        <td class="px-4 py-3 change-highlight">
         137****9682
        </td>
        <td class="px-4 py-3 change-highlight">
         9900456
        </td>
        <td class="px-4 py-3 change-highlight">
         real\HATC\Inland\Test\Cent
        </td>
        <td class="px-4 py-3 change-highlight">
         <span class="audit-type-pill cent">
          美分账户
         </span>
        </td>
        <td class="px-4 py-3 change-highlight">
         1:100
        </td>
        <td class="px-4 py-3 font-medium change-highlight">
         待审核
        </td>
        <td class="px-4 py-3 change-highlight">
         -
        </td>
        <td class="px-4 py-3 change-highlight">
         -
        </td>
        <td class="px-4 py-3 change-highlight">
         2026-07-21 15:21:28
        </td>
        <td class="px-4 py-3 change-highlight">
         -
        </td>
       </tr>
      </tbody>
     </table>
    </div>
    <!-- 分页 -->
    <div class="mt-4 flex items-center gap-2">
     <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50">
      <i class="fa-solid fa-angle-left text-xs">
      </i>
     </button>
     <button class="w-8 h-8 flex items-center justify-center rounded bg-blue-500 text-white font-medium text-sm">
      1
     </button>
     <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50">
      <i class="fa-solid fa-angle-right text-xs">
      </i>
     </button>
    </div>
   </div>
  </div>
 </main>
</main>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
