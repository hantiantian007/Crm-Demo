<template>
  <div class="flex h-full bg-mainBg overflow-hidden">
    <div class="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden p-4 custom-scrollbar overflow-y-auto">
      <div class="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col">
 <!-- 客户头部信息 -->
 <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 relative">
  <div class="flex items-center space-x-4">
   <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
    张
   </div>
   <div>
    <h2 class="text-xl font-bold text-gray-800 flex flex-wrap items-center gap-2">
     张三
     <span id="demo-status-badge">
      <span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-normal border border-green-200">
       已转化
      </span>
     </span>
     <span id="demo-deposit-badge">
      <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-normal border border-yellow-200">
       已入金
      </span>
     </span>
    </h2>
    <p class="text-sm text-gray-500 mt-1">
     线索ID: LD-20231024-001 |
     <span id="demo-assignee-text">
      归属销售: 李四
     </span>
     | 创建时间: 2023-10-24 10:00:00
    </p>
    <!-- 客户标签展示区 -->
    <div class="flex flex-wrap items-center gap-2 mt-2" id="clientTagsContainer">
     <span class="inline-flex items-center bg-red-50 text-red-600 border border-red-200 text-xs px-2 py-0.5 rounded">
      高净值客户
      <button class="ml-1 text-red-400 hover:text-red-600">
       <i class="fa-solid fa-times text-[10px]">
       </i>
      </button>
     </span>
     <span class="inline-flex items-center bg-blue-50 text-blue-600 border border-blue-200 text-xs px-2 py-0.5 rounded">
      偏好黄金
      <button class="ml-1 text-blue-400 hover:text-blue-600">
       <i class="fa-solid fa-times text-[10px]">
       </i>
      </button>
     </span>
     <button class="inline-flex items-center bg-gray-50 text-gray-500 border border-dashed border-gray-300 hover:border-blue-400 hover:text-blue-500 text-xs px-2 py-0.5 rounded cursor-pointer transition-colors">
      <i class="fa-solid fa-plus mr-1">
      </i>
      添加标签
     </button>
    </div>
   </div>
  </div>
  <div class="flex space-x-3 w-full lg:w-auto" id="demo-action-buttons">
   <button class="flex-1 lg:flex-none px-3 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-100 transition-colors shadow-sm text-sm font-medium" title="复制带有LeadID参数的代理注册链接">
    <i class="fa-solid fa-copy mr-1">
    </i>
    复制代理邀请链接
   </button>
   <button class="flex-1 lg:flex-none px-3 py-2 bg-teal-50 text-teal-600 border border-teal-200 rounded hover:bg-teal-100 transition-colors shadow-sm text-sm font-medium" title="复制带有LeadID参数的直客注册链接">
    <i class="fa-solid fa-copy mr-1">
    </i>
    复制直客邀请链接
   </button>
   <button class="flex-1 lg:flex-none px-3 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded hover:bg-orange-100 transition-colors shadow-sm text-sm font-medium">
    <i class="fa-solid fa-recycle mr-1">
    </i>
    退回公海
   </button>
  </div>
 </div>
 <!-- 主体内容分左右两列 -->
 <div class="flex flex-col lg:flex-row flex-1 gap-4 lg:min-h-0">
  <!-- 左侧：基础信息表单 -->
  <div class="w-full lg:w-1/3 bg-white rounded-lg shadow-sm border border-gray-200 p-5 lg:overflow-y-auto">
   <div class="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
    <h3 class="text-lg font-bold text-gray-800 border-l-4 border-primaryBtn pl-2">
     基础信息
    </h3>
    <button class="text-sm text-blue-600 hover:text-blue-800">
     <i class="fa-solid fa-edit mr-1">
     </i>
     保存修改
    </button>
   </div>
   <form class="space-y-4">
    <div>
     <label class="block text-sm font-medium text-gray-700 mb-1">
      姓名
      <span class="text-red-500">
       *
      </span>
     </label>
     <input class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn" type="text" value="张三"/>
    </div>
    <div>
     <label class="block text-sm font-medium text-gray-700 mb-1">
      手机号码
      <span class="text-red-500">
       *
      </span>
     </label>
     <input class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn" type="text" value="13800138000"/>
    </div>
    <div>
     <label class="block text-sm font-medium text-gray-700 mb-1">
      电子邮箱
     </label>
     <input class="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" disabled="" type="email" value="zhangsan@example.com"/>
    </div>
    <div>
     <label class="block text-sm font-medium text-gray-700 mb-1">
      所属代理
     </label>
     <div class="relative flex items-center">
      <input class="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-600 cursor-not-allowed" disabled="" type="text" value="王大拿"/>
      <span class="absolute right-3 text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded border border-blue-100" title="由客户手机号匹配到系统已有代理">
       <i class="fas fa-link mr-1">
       </i>
       手机号关联
      </span>
     </div>
    </div>
    <div>
     <label class="block text-sm font-medium text-gray-700 mb-1">
      咨询内容
     </label>
     <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn">
      <option>
       成为代理
      </option>
      <option>
       活动咨询
      </option>
      <option>
       开户咨询
      </option>
      <option selected="">
       个人交易
      </option>
      <option>
       其他
      </option>
     </select>
    </div>
    <div>
     <label class="block text-sm font-medium text-gray-700 mb-1">
      信息来源
     </label>
     <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn">
      <option selected="">
       官网访问
      </option>
      <option>
       社交平台
      </option>
      <option>
       客户推荐
      </option>
      <option>
       线上活动
      </option>
      <option>
       线下金融活动
      </option>
      <option>
       金融资讯网站
      </option>
      <option>
       其他渠道
      </option>
     </select>
    </div>
    <div>
     <label class="block text-sm font-medium text-gray-700 mb-1">
      查询渠道
     </label>
     <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn">
      <option>
       WhatsApp
      </option>
      <option selected="">
       Email
      </option>
      <option>
       Zendesk
      </option>
      <option>
       Telegram
      </option>
     </select>
    </div>
    <div class="hidden">
     <label class="block text-sm font-medium text-gray-700 mb-1">
      期望服务
     </label>
     <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn">
      <option>
       自主外汇交易
      </option>
      <option>
       代理加盟合作
      </option>
      <option>
       保本理财产品
      </option>
      <option>
       机构大宗交易
      </option>
      <option>
       跟单/资管服务
      </option>
     </select>
    </div>
    <div>
     <label class="block text-sm font-medium text-gray-700 mb-1">
      备注说明
     </label>
     <textarea class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn" rows="3">客户对高杠杆外汇交易感兴趣，资金量大约在5万美金左右。</textarea>
    </div>
   </form>
  </div>
  <!-- 右侧：Tabs面板 (跟进/变更/转化) -->
  <div class="w-full lg:w-2/3 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden min-h-[500px] lg:min-h-0">
   <!-- Tabs 导航 -->
   <div class="flex border-b border-gray-200 bg-gray-50 px-4 pt-2 overflow-x-auto whitespace-nowrap no-scrollbar" id="demo-tab-container">
    <button class="px-4 py-2 text-sm font-medium text-primaryBtn border-b-2 border-primaryBtn bg-white rounded-t-lg" id="tab-followup">
     跟进记录
    </button>
    <button class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent" id="tab-changelog">
     变更记录
    </button>
    <button class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent" id="tab-lead-records">
     留资记录（3）
    </button>
    <button class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent" id="tab-conversion">
     转化成果
    </button>
   </div>
   <!-- Tabs 内容区 -->
   <div class="p-5 flex-1 overflow-y-auto">
    <!-- 跟进记录 Tab -->
    <div class="block" id="content-followup">
     <div class="mb-4">
      <textarea class="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn mb-2" placeholder="输入跟进内容..." rows="3"></textarea>
      <div class="flex justify-between items-center">
       <div class="flex gap-4">
        <div class="flex flex-col gap-1">
         <select class="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-primaryBtn">
          <option>
           更新状态：跟进中
          </option>
          <option>
           更新状态：无效线索
          </option>
          <option>
           更新状态：已转化
          </option>
         </select>
         <span class="text-xs text-gray-400">
          当前即使为“已转化”或“无效线索”，也支持再次修改状态
         </span>
        </div>
        <input class="border border-gray-300 rounded px-2 py-1 text-sm text-gray-600 outline-none focus:border-primaryBtn" title="下次跟进时间" type="datetime-local"/>
       </div>
       <button class="px-4 py-1.5 bg-primaryBtn text-white text-sm rounded hover:bg-primaryBtnHover transition-colors">
        发布跟进
       </button>
      </div>
     </div>
     <!-- 时间轴 -->
     <div class="relative border-l-2 border-gray-200 ml-3 mt-6 space-y-6">
      <!-- 状态：已转化 -->
      <div class="relative pl-6">
       <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow">
       </div>
       <div class="bg-gray-50 p-3 rounded border border-gray-100">
        <div class="flex justify-between items-start mb-1">
         <span class="font-medium text-gray-800 text-sm">
          李四 (销售)
         </span>
         <span class="text-xs text-gray-500">
          2023-10-28 10:15:00
         </span>
        </div>
        <p class="text-sm text-gray-600">
         客户已确认开通代理账户并成功完成首笔入金，后续由客服团队接手维护。
        </p>
        <div class="mt-2 flex gap-2">
         <span class="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded border border-green-100">
          状态：已转化
         </span>
        </div>
       </div>
      </div>
      <!-- 状态：退回公海 -->
      <div class="relative pl-6">
       <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-500 border-4 border-white shadow">
       </div>
       <div class="bg-gray-50 p-3 rounded border border-gray-100">
        <div class="flex justify-between items-start mb-1">
         <span class="font-medium text-gray-800 text-sm">
          王大拿 (主管)
         </span>
         <span class="text-xs text-gray-500">
          2023-10-27 16:20:00
         </span>
        </div>
        <p class="text-sm text-gray-600">
         销售反馈客户近期无入金意愿，强制回收资源，释放给其他组员跟进。
        </p>
        <div class="mt-2 flex gap-2">
         <span class="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-300">
          状态：退回公海
         </span>
        </div>
       </div>
      </div>
      <!-- 状态：无效线索 -->
      <div class="relative pl-6">
       <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-red-500 border-4 border-white shadow">
       </div>
       <div class="bg-gray-50 p-3 rounded border border-gray-100">
        <div class="flex justify-between items-start mb-1">
         <span class="font-medium text-gray-800 text-sm">
          李四 (销售)
         </span>
         <span class="text-xs text-gray-500">
          2023-10-26 09:45:00
         </span>
        </div>
        <p class="text-sm text-gray-600">
         电话打不通，空号。加微信也提示用户不存在，申请标记为无效线索。
        </p>
        <div class="mt-2 flex gap-2">
         <span class="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded border border-red-100">
          状态：无效线索
         </span>
        </div>
       </div>
      </div>
      <!-- 状态：跟进中 -->
      <div class="relative pl-6">
       <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow">
       </div>
       <div class="bg-gray-50 p-3 rounded border border-gray-100">
        <div class="flex justify-between items-start mb-1">
         <span class="font-medium text-gray-800 text-sm">
          李四 (销售)
         </span>
         <span class="text-xs text-gray-500">
          2023-10-25 14:30:00
         </span>
        </div>
        <p class="text-sm text-gray-600">
         客户已添加微信，发送了公司介绍资料。客户表示周末会详细看下。
        </p>
        <div class="mt-2 flex gap-2">
         <span class="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded border border-blue-100">
          状态：跟进中
         </span>
         <span class="bg-orange-50 text-orange-600 text-xs px-2 py-0.5 rounded border border-orange-100">
          <i class="fa-regular fa-clock mr-1">
          </i>
          下次跟进: 2023-10-30
         </span>
        </div>
       </div>
      </div>
      <!-- 初始分配 -->
      <div class="relative pl-6">
       <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 border-4 border-white shadow">
       </div>
       <div class="bg-gray-50 p-3 rounded border border-gray-100">
        <div class="flex justify-between items-start mb-1">
         <span class="font-medium text-gray-800 text-sm">
          系统分配
         </span>
         <span class="text-xs text-gray-500">
          2023-10-24 10:05:00
         </span>
        </div>
        <p class="text-sm text-gray-600">
         线索由系统自动分配给销售
         <span class="font-medium">
          李四
         </span>
        </p>
        <div class="mt-2 flex gap-2">
         <span class="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-300">
          系统操作
         </span>
        </div>
       </div>
      </div>
     </div>
    </div>
    <!-- 变更记录 Tab -->
    <div class="hidden" id="content-changelog">
     <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-600 min-w-[600px]">
       <thead class="bg-gray-50 text-gray-700">
        <tr>
         <th class="px-4 py-2 font-medium border-b border-gray-200">
          变更时间
         </th>
         <th class="px-4 py-2 font-medium border-b border-gray-200">
          变更字段
         </th>
         <th class="px-4 py-2 font-medium border-b border-gray-200">
          变更前内容
         </th>
         <th class="px-4 py-2 font-medium border-b border-gray-200">
          变更后内容
         </th>
         <th class="px-4 py-2 font-medium border-b border-gray-200">
          操作人
         </th>
        </tr>
       </thead>
       <tbody>
        <tr class="border-b border-gray-100 hover:bg-gray-50 hidden">
         <td class="px-4 py-3">
          2023-10-25 10:15:00
         </td>
         <td class="px-4 py-3">
          期望服务
         </td>
         <td class="px-4 py-3">
          <span class="line-through text-gray-400">
           未知
          </span>
         </td>
         <td class="px-4 py-3">
          <span class="text-green-600 bg-green-50 px-1 rounded">
           外汇交易
          </span>
         </td>
         <td class="px-4 py-3">
          李四
         </td>
        </tr>
        <tr class="border-b border-gray-100 hover:bg-gray-50">
         <td class="px-4 py-3">
          2023-10-25 10:15:00
         </td>
         <td class="px-4 py-3">
          备注说明
         </td>
         <td class="px-4 py-3">
          <span class="line-through text-gray-400">
           无
          </span>
         </td>
         <td class="px-4 py-3">
          <span class="text-green-600 bg-green-50 px-1 rounded">
           客户对高杠杆...
          </span>
         </td>
         <td class="px-4 py-3">
          李四
         </td>
        </tr>
       </tbody>
      </table>
     </div>
     <div class="mt-4 text-center text-xs text-gray-400">
      仅显示最近 50 条变更记录
     </div>
    </div>
    <!-- 留资记录 Tab -->
    <div class="hidden" id="content-lead-records">
     <div class="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm text-blue-800">
      <i class="fa-solid fa-info-circle mr-1">
      </i>
      该客户使用相同邮箱提交了多次留资，已自动归纳合并。
     </div>
     <div class="space-y-4">
      <!-- 最新一次留资 -->
      <div class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm relative overflow-hidden">
       <div class="absolute top-0 left-0 w-1 h-full bg-blue-500">
       </div>
       <div class="flex justify-between items-start mb-2">
        <h4 class="font-bold text-gray-800">
         第 3 次留资
         <span class="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
          最新
         </span>
        </h4>
        <span class="text-xs text-gray-500">
         2023-10-25 14:00:00
        </span>
       </div>
       <div class="grid grid-cols-2 gap-y-2 text-sm">
        <div>
         <span class="text-gray-500">
          联系电话：
         </span>
         13800138000
        </div>
        <div>
         <span class="text-gray-500">
          信息来源：
         </span>
         官网访问
        </div>
        <div>
         <span class="text-gray-500">
          客户来源：
         </span>
         官网录入
        </div>
        <div>
         <span class="text-gray-500">
          查询渠道：
         </span>
         Email
        </div>
        <div>
         <span class="text-gray-500">
          咨询内容：
         </span>
         外汇交易
        </div>
        <div>
         <span class="text-gray-500">
          线索热度：
         </span>
         高
        </div>
        <div class="col-span-2">
         <span class="text-gray-500">
          备注：
         </span>
         对高杠杆外汇交易感兴趣，资金量约5万美金。
        </div>
       </div>
      </div>
      <!-- 历史留资 2 -->
      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50 opacity-80">
       <div class="flex justify-between items-start mb-2">
        <h4 class="font-bold text-gray-700">
         第 2 次留资
        </h4>
        <span class="text-xs text-gray-500">
         2023-10-10 09:30:00
        </span>
       </div>
       <div class="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
        <div>
         <span class="text-gray-400">
          联系电话：
         </span>
         13800138000
        </div>
        <div>
         <span class="text-gray-400">
          信息来源：
         </span>
         线下金融活动
        </div>
        <div>
         <span class="text-gray-400">
          客户来源：
         </span>
         销售录入
        </div>
        <div>
         <span class="text-gray-400">
          查询渠道：
         </span>
         WhatsApp
        </div>
        <div>
         <span class="text-gray-400">
          咨询内容：
         </span>
         活动咨询
        </div>
        <div class="col-span-2">
         <span class="text-gray-400">
          备注：
         </span>
         询问广州展会的具体地址和参会福利。
        </div>
       </div>
      </div>
      <!-- 历史留资 1 -->
      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50 opacity-80">
       <div class="flex justify-between items-start mb-2">
        <h4 class="font-bold text-gray-700">
         第 1 次留资
        </h4>
        <span class="text-xs text-gray-500">
         2023-09-01 16:15:00
        </span>
       </div>
       <div class="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
        <div>
         <span class="text-gray-400">
          联系电话：
         </span>
         未提供
        </div>
        <div>
         <span class="text-gray-400">
          信息来源：
         </span>
         社交平台广告
        </div>
        <div>
         <span class="text-gray-400">
          客户来源：
         </span>
         注册页录入
        </div>
        <div>
         <span class="text-gray-400">
          查询渠道：
         </span>
         Telegram
        </div>
        <div>
         <span class="text-gray-400">
          咨询内容：
         </span>
         了解开户
        </div>
        <div class="col-span-2">
         <span class="text-gray-400">
          备注：
         </span>
         无
        </div>
       </div>
      </div>
     </div>
    </div>
    <!-- 转化成果 Tab -->
    <div class="hidden" id="content-conversion">
     <div class="bg-green-50 border border-green-200 rounded-lg p-5">
      <div class="flex items-center gap-3 mb-4">
       <div class="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
        <i class="fa-solid fa-check-circle">
        </i>
       </div>
       <div>
        <h4 class="font-bold text-green-800">
         已成功转化为客户
        </h4>
        <p class="text-xs text-green-600">
         转化耗时: 1天4小时 | 转化时间: 2023-10-25 14:00:00 |
         <span class="font-medium bg-green-200 px-1 rounded text-green-800">
          关联方式: 专属链接自动绑定
         </span>
        </p>
       </div>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-white p-4 rounded border border-green-100">
       <div>
        <p class="text-xs text-gray-500 mb-1">
         关联客户账户
        </p>
        <div class="font-medium text-gray-800 flex items-center gap-3">
         <a class="text-blue-600 hover:underline flex items-center gap-1" href="#">
          ID: 88820391
          <i class="fa-solid fa-external-link-alt text-[10px]">
          </i>
         </a>
         <button class="text-xs text-indigo-600 border border-indigo-200 bg-indigo-50 px-2 py-0.5 rounded hover:bg-indigo-100 transition-colors">
          修改关联
         </button>
        </div>
       </div>
       <div>
        <p class="text-xs text-gray-500 mb-1">
         开户状态
        </p>
        <p class="font-medium text-gray-800">
         审核通过
        </p>
       </div>
       <div>
        <p class="text-xs text-gray-500 mb-1">
         首次入金时间
        </p>
        <p class="font-medium text-gray-800">
         2023-10-26 09:30:00
        </p>
       </div>
       <div>
        <p class="text-xs text-gray-500 mb-1">
         首次入金金额
        </p>
        <p class="font-medium text-red-600">
         $ 5,000.00
        </p>
       </div>
       <div class="mt-2 pt-3 border-t border-gray-100 col-span-2 lg:col-span-4">
       </div>
       <div>
        <p class="text-xs text-gray-500 mb-1">
         净入金 (入-出)
        </p>
        <p class="font-medium text-red-600">
         $ 12,500.00
        </p>
       </div>
       <div>
        <p class="text-xs text-gray-500 mb-1">
         当前账户余额
        </p>
        <p class="font-medium text-gray-800">
         $ 15,230.50
        </p>
       </div>
       <div>
        <p class="text-xs text-gray-500 mb-1">
         累计交易手数
        </p>
        <p class="font-medium text-gray-800">
         45.5 手
        </p>
       </div>
       <div>
        <p class="text-xs text-gray-500 mb-1">
         累计盈亏
        </p>
        <p class="font-medium text-red-600">
         +$ 2,730.50
        </p>
       </div>
      </div>
      <div class="mt-5 text-center">
       <a class="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors shadow-sm text-sm" href="#">
        查看完整客户画像
       </a>
      </div>
     </div>
     <!-- 手动关联区 (当未转化时显示，此处仅做UI占位演示) -->
     <div class="mt-6 p-5 border border-dashed border-gray-300 rounded-lg bg-gray-50">
      <h4 class="font-medium text-gray-800 mb-2">
       <i class="fa-solid fa-link text-gray-400 mr-2">
       </i>
       关联客户账户
      </h4>
      <p class="text-xs text-gray-500 mb-4">
       如果客户已自行在官网注册，可在此处输入客户 CRM 账号 ID 进行绑定；如已存在绑定关系，也支持修改为新的关联账户。
      </p>
      <div class="flex gap-3">
       <input class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn" placeholder="输入CRM客户ID (如: 88820391)" type="text"/>
       <button class="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 transition-colors">
        保存关联
       </button>
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

<script setup>
import { ref } from 'vue'
</script>
