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

role_infos = {

}

addAttrButton.addEventListener("click", () => {
  // 获取表格的 tbody 元素
  const attrs = document.getElementById("attrs")
  const tbody = attrs.querySelector("tbody");

  // 创建新的表格行
  const newRow = document.createElement("tr");

  // 为表格行添加单元格
  const nameCell = document.createElement("td");
  const attrCell = document.createElement("td");
  const detailCell = document.createElement("td");

  // 为角色单元格添加下拉列表
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.classList.add("bg-gray-800", "text-gray-300", "rounded", "w-full", "p-2");
  nameCell.appendChild(nameInput);

  const attrInput = document.createElement("input");
  attrInput.setAttribute("type", "text");
  attrInput.classList.add("bg-gray-800", "text-gray-300", "rounded", "w-full", "p-2");
  attrCell.appendChild(attrInput);

  // 为人物背景单元格添加输入框
  const detailInput = document.createElement("input");
  detailInput.setAttribute("type", "text");
  detailInput.classList.add("bg-gray-800", "text-gray-300", "rounded", "w-full", "p-2");
  detailCell.appendChild(detailInput);

  // 将单元格添加到表格行
  newRow.appendChild(nameCell);
  newRow.appendChild(attrCell);
  newRow.appendChild(detailCell);

   const btnCell = document.createElement("td");
  btnCell.innerHTML = `
    <button onclick="modifyRow(this)" class="bg-green-600 text-gray-200 py-1 px-3 rounded">修改</button>
    <button onclick="deleteRow(this)" class="bg-red-600 text-gray-200 py-1 px-3 rounded">删除</button>
`;
  newRow.appendChild(btnCell)

  // 将表格行添加到表格的 tbody 元素
  tbody.appendChild(newRow);
});

function modifyRow(btn) {
    let row = btn.parentNode.parentNode;
    let dataCell = row.cells[0];
    let newData = prompt("请输入新数据：", dataCell.innerHTML);
    if (newData != null) {
        dataCell.innerHTML = newData;
    }
}

function deleteRow(btn) {
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// 为新增角色按钮添加点击事件监听器
addRoleButton.addEventListener("click", () => {
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
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.classList.add("bg-gray-800", "text-gray-300", "rounded", "w-full", "p-2");
  nameCell.appendChild(nameInput);

  nameInput.addEventListener('input', function() {
    // 在这里添加输入事件的处理程序
    console.log('用户输入了：', nameInput.value);
  });

  const genderInput = document.createElement("input");
  genderInput.setAttribute("type", "text");
  genderInput.classList.add("bg-gray-800", "text-gray-300", "rounded", "w-full", "p-2");
  genderCell.appendChild(genderInput);

  // 为角色单元格添加下拉列表
  const roleSelect = document.createElement("select");
  roleSelect.classList.add("bg-gray-800", "text-gray-300", "rounded", "w-full", "p-2");
  const mainRoleOption = document.createElement("option");
  mainRoleOption.textContent = "主角";
  roleSelect.appendChild(mainRoleOption);
  const sideRoleOption = document.createElement("option");
  sideRoleOption.textContent = "配角";
  roleSelect.appendChild(sideRoleOption);
  roleCell.appendChild(roleSelect);

  // 为人物背景单元格添加输入框
  const backgroundInput = document.createElement("input");
  backgroundInput.setAttribute("type", "text");
  backgroundInput.classList.add("bg-gray-800", "text-gray-300", "rounded", "w-full", "p-2");
  backgroundCell.appendChild(backgroundInput);

  // 将单元格添加到表格行
  newRow.appendChild(nameCell);
  newRow.appendChild(genderCell);
  newRow.appendChild(roleCell);
  newRow.appendChild(backgroundCell);

  // 将表格行添加到表格的 tbody 元素
  tbody.appendChild(newRow);
});

const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', function() {
  // 在这里添加按钮点击事件的处理程序
  console.log('生成按钮被点击');
    $.ajax({
    url: '/on_dragging',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ 'result': pos_data}),
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
});



  //
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