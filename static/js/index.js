let USER_INFO = {

}

USER_CONTEXT = {
}

// 获取所有标签按钮和内容项
const tabs = document.querySelectorAll("nav button");
const contentItems = document.querySelectorAll(".content-item");

// 为每个标签按钮添加点击事件监听器
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // 隐藏所有内容项
    contentItems.forEach((item) => {
      item.classList.add("hidden");
    });

    // 显示与点击的标签对应的内容项
    contentItems[index].classList.remove("hidden");
  });
});

// 获取新增角色按钮
const addRoleButton = document.getElementById('new_role')
const addAttrButton = document.getElementById('new_attr')

const userWindow = document.getElementById('userWindow');
const userName = document.getElementById('userName');
const userGender = document.getElementById('userGender');
const userRole = document.getElementById('userRole');
const userBackground = document.getElementById('userBackground');
const saveUserChange = document.getElementById('saveUserChange');
const cancelUserChange = document.getElementById('cancelUserChange');

const attrWindow = document.getElementById('attrWindow');
const attrUserName = document.getElementById('attrUserName');
const attrName = document.getElementById('attrName');
const attrInfo = document.getElementById('attrInfo');
const saveAttrChange = document.getElementById('saveAttrChange');
const cancelAttrChange = document.getElementById('cancelAttrChange');

addRoleButton.addEventListener('click', () => {
  userWindow.classList.remove('hidden');
});

addAttrButton.addEventListener('click', () => {
    pos_data = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ];

  var mySelect = document.getElementById("attrUserName");
  // 删除已有的选项
  while (mySelect.firstChild) {
    mySelect.removeChild(mySelect.firstChild);
  }


 let user_names = Object.keys(USER_INFO)

    // 添加选项
  for (var i = 0; i < user_names.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", user_names[i]);
      option.innerHTML = user_names[i];
      mySelect.appendChild(option);
  }

  changeEcharts(pos_data)
  attrWindow.classList.remove('hidden');
});

cancelUserChange.addEventListener('click', () => {
// 清空输入框并关闭模态框
userName.value = '';
userRole.value = '';
userBackground.value = '';
userWindow.classList.add('hidden');
});

cancelAttrChange.addEventListener('click', () => {
// 清空输入框并关闭模态框
attrName.value = '';
attrInfo.value = '';
attrWindow.classList.add('hidden');
});

saveAttrChange.addEventListener('click', () => {

  if (("attr" in USER_INFO[attrUserName.value]) && (attrName.value in USER_INFO[attrUserName.value]["attr"])){
      USER_INFO[attrUserName.value]["attr"][attrName.value]["info"] = attrInfo.value;
      USER_INFO[attrUserName.value]["attr"][attrName.value]["data"] = pos_data.slice()

      USER_CONTEXT['attr_row'].cells[0].textContent = attrUserName.value;
      USER_CONTEXT['attr_row'].cells[1].textContent = attrName.value;
      USER_CONTEXT['attr_row'].cells[2].textContent = attrInfo.value;

      attrName.value = '';
      attrInfo.value = '';
      attrWindow.classList.add('hidden');
      return
  }

  if (attrUserName.value && attrName.value && attrInfo.value) {
    // 获取表格的 tbody 元素
    const attrs = document.getElementById("attrs")
    const tbody = attrs.querySelector("tbody");

    // 创建新的表格行
    const newRow = document.createElement("tr");

    // 为表格行添加单元格
    const nameCell = document.createElement("td");
    const attrCell = document.createElement("td");
    const detailCell = document.createElement("td");

    nameCell.textContent = attrUserName.value
    nameCell.classList.add("bg-gray-800", "border-gray-600", "w-1/4", "border", "text-gray-300", "text-center");

    attrCell.textContent = attrName.value
    attrCell.classList.add("bg-gray-800", "border-gray-600", "w-1/4","border", "text-gray-300", "text-center");

    detailCell.textContent = attrInfo.value
    detailCell.classList.add("bg-gray-800", "border-gray-600", "w-1/4","border", "text-gray-300", "text-center");

    // 将单元格添加到表格行
    newRow.appendChild(nameCell);
    newRow.appendChild(attrCell);
    newRow.appendChild(detailCell);

    const btnCell = document.createElement("td");
    btnCell.innerHTML = `
      <button onclick="modifyRow(this)" class="bg-green-600 text-gray-200 py-1 px-3 rounded w-1/8">修改</button>
      <button onclick="deleteRow(this)" class="bg-red-600 text-gray-200 py-1 px-3 rounded w-1/8">删除</button>
  `;
    newRow.appendChild(btnCell)

    // 将表格行添加到表格的 tbody 元素
    tbody.appendChild(newRow);

    if (!("attr" in USER_INFO[attrUserName.value])){
      USER_INFO[attrUserName.value]["attr"] = {}
    }

    if (!(attrName in USER_INFO[attrUserName.value]["attr"])) {
      USER_INFO[attrUserName.value]["attr"][attrName.value] = {}
    }

    USER_INFO[attrUserName.value]["attr"][attrName.value]["info"] = attrInfo.value;
    USER_INFO[attrUserName.value]["attr"][attrName.value]["data"] = pos_data.slice();

    // 清空输入框并关闭模态框
    attrName.value = '';
    attrInfo.value = '';
    attrWindow.classList.add('hidden');
  }
  else{
    alert('请填写完整信息');
  }
});

function modifyRow(btn) {
    let row = btn.parentNode.parentNode;
    attrUserName.value = row.cells[0].textContent;
    attrName.value = row.cells[1].textContent;
    attrInfo.value = row.cells[2].textContent;

    attrWindow.classList.remove('hidden');
    pos_data = USER_INFO[attrUserName.value]["attr"][attrName.value]['data'].slice()

    changeEcharts(pos_data)

    USER_CONTEXT['attr_row'] = row
}

function deleteRow(btn) {
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// 为新增角色按钮添加点击事件监听器

saveUserChange.addEventListener('click', () => {
  const name = userName.value;
  const gender = userGender.value;
  const role = userRole.value;
  const background = userBackground.value;

if (name && gender && role && background) {
  // 获取表格的 tbody 元素
  const roles = document.getElementById("roles")
  const tbody = roles.querySelector("tbody");

  // 创建新的表格行
  const newRow = document.createElement("tr");

  // 为表格行添加单元格
  const nameCell = document.createElement("td");
  const genderCell = document.createElement("td");
  const roleCell = document.createElement("td");
  const backgroundCell = document.createElement("td");

  // 为姓名和性别单元格添加输入框
  nameCell.textContent = name;
  nameCell.classList.add("bg-gray-800", "border-gray-600", "border", "text-gray-300", "p-2", "text-center");

  genderCell.textContent = gender;
  genderCell.classList.add("bg-gray-800", "border-gray-600", "border", "text-gray-300", "p-2", "text-center");

  roleCell.textContent = role;
  roleCell.classList.add("bg-gray-800", "border-gray-600", "border", "text-gray-300", "p-2", "text-center");

  backgroundCell.textContent = background;
  backgroundCell.classList.add("bg-gray-800", "border-gray-600", "border", "text-gray-300", "p-2", "text-center");

  // 将单元格添加到表格行
  newRow.appendChild(nameCell);
  newRow.appendChild(genderCell);
  newRow.appendChild(roleCell);
  newRow.appendChild(backgroundCell);

  // 将表格行添加到表格的 tbody 元素
  tbody.appendChild(newRow);

  // 清空输入框并关闭模态框
  userName.value = '';
  userRole.value = '';
  userBackground.value = '';
  userWindow.classList.add('hidden');

  if (!(name in USER_INFO)){
    USER_INFO[name] = {}
  }

  USER_INFO[name]["gender"] = gender;
  USER_INFO[name]["role"] = role
  USER_INFO[name]["background"] = background;
}
else{
alert('请填写完整信息');
}
});

const generateBtn = document.getElementById('generate');

function sendUserInfo() {
  // 在这里添加按钮点击事件的处理程序
  const tab4 = document.getElementById('tab4');
  tab4.click();

  const storyName = document.getElementById('storyName').value;
  const storyStyle = document.getElementById('storyStyle').value;
  const storyBackground = document.getElementById('storyBackground').value;

    const store_info = {
        "storyName": storyName,
        "storyStyle": storyStyle,
        "storyBackground": storyBackground
    };

    console.log('生成按钮被点击');
    $.ajax({
    url: '/on_dragging',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ 'result': {
          "user_info": USER_INFO,
            "story_info": store_info
        }}),
    success: function (response) {
        if (response.status === "success") {
            console.log("结果已成功发送到Flask");
        } else {
            console.log("发送结果失败");
        }
    },
    error: function () {
        console.log("Ajax请求失败");
    }
  });
}

generateBtn.addEventListener('click', sendUserInfo);

  // 用来限制name必须是已创建的角色
  // const attrs = document.getElementById("attrs")
  // const tbody = attrs.querySelector("tbody");
  //
  // let rows = attrs.rows;
  // for (let i = 1; i < rows.length; i++) {
  //         let rowData = {};
  //         // rowData['角色'] = rows[i].cells[0].querySelector('input').value;
  //         // rowData['属性'] = rows[i].cells[1].querySelector('input').value;
  //         // rowData['详情'] = rows[i].cells[2].querySelector('input').value;
  //
  //         role_name= rows[i].cells[0].querySelector('input').value;
  //         role_attr = rows[i].cells[1].querySelector('input').value;
  //         role_info = rows[i].cells[2].querySelector('input').value;
  //
  //         if (!role_infos.has(role_name)){
  //           role_infos[role_name] = {}
  //         }
  //
  //     }