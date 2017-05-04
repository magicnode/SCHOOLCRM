### SCHOOLCRM 学校实验室消耗品管理 (后端)

backend of schoolcrm

[项目源码](https://github.com/magicnode/SCHOOLCRM)

#### 1. 技术栈

express + axios + jwt

es6编码

#### 2.Build Setup

	# install dependencies
	yarn install

	# serve with hot reload at localhost:8888
	yarn run dev

	# build for production with minification
	yarn run build

	# watch apidoc
	yarn run docs

#### 3. 已经完成的模块

- [x] 用户资源
- [x] 物品资源
- [x] 分类资源
- [x] 清单资源
- [x] 汇总报表资源
- [x] 角色资源
- [x] 权限创建
- [x] 根据路由和token进行权限过滤
- [x] 用户与角色关联 (一个用户可以拥有多个角色)
- [x] 角色和权限的关联， 用户和权限的关联 

#### 4. 待完成与优化

- [ ] 用户登录返回auth token
- [ ] 实验室员工接到期末创建清单任务后创建物品审核清单提交给主管
- [ ] 主管审批后返还实验室
- [ ] 材料管理科分类汇总并将资料发送审计处，财务处和校长
- [ ] 对主管审批后的清单进行汇总, 根据期末日期来定义
- [ ] 材料管理科根据清单汇总购买物品并入库
- [ ] 完善API文档
