<template>
  <div>
    <div class="container">
      <b-row class="row-split">
        <b-col cols="8" class="title">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>分组管理</el-breadcrumb-item>
            <el-breadcrumb-item>问卷检索</el-breadcrumb-item>
          </el-breadcrumb>
        </b-col>
      </b-row>
      <el-row class="row-split">
        <div class="search-title">
          <h5>目标问卷</h5>
          <el-select class="questions" v-model="param.template"
                     placeholder="目标问卷" value-key="id" @change="forceUpdate">
            <el-option
              v-for="template in templates"
              :key="template.id"
              :label="template.name"
              :value="template">
            </el-option>
          </el-select>
          <el-button-group>
            <el-button type="primary" v-on:click="startSearch">筛选条件</el-button>
            <el-button type="primary"
                       v-if="searchResult&&searchResult.queryId"
                       v-on:click="selectAuthUser(searchResult)">结果导出
            </el-button>
            <el-button type="primary"
                       v-on:click="showExportHistory(param.template)">导出历史</el-button>

            <el-button type="primary"
                       v-if="searchResult&&searchResult.queryId"
                       v-on:click="showAnalysis(searchResult.queryId)"
            >数据分析
            </el-button>
          </el-button-group>

        </div>
      </el-row>
      <el-row class="row-split">
        <table class="table" v-loading="processing">
          <tr>
            <th>
              #
            </th>
            <th>
              问卷编号
            </th>
            <th>
              被调查人
            </th>
            <th>
              问卷时间
            </th>
            <th>
              填写时间
            </th>
            <th>
              查看
            </th>
          </tr>
          <tr v-for="(q,i) in searchResult.data" :key="i" >
            <td>
              {{1+i+searchResult.current*searchResult.limit-searchResult.limit}}
            </td>
            <td>
              {{q.serialCode}}
            </td>
            <td>
              {{q.owner.nickName}}
            </td>
            <td>
              {{new Date(q.questionDate)|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{new Date(q.createTime)|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              <a :style="{'margin-left':'5px'}" v-b-tooltip.hover title="查看问卷"
                 :href="'#/question/user/detail/view/'+q.id" target='_blank' class="btn btn-primary btn-sm">
                <i class="fa fa-eye"></i>
              </a>
            </td>
          </tr>
        </table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="searchResult.current"
          :page-size="searchResult.limit"
          layout="total, prev, pager, next"
          :total="searchResult.total">
        </el-pagination>
      </el-row>
      <question-search-modal ref="searchModal" :on-result="updateSearchResult"
                             :query-start="queryStart"></question-search-modal>

    </div>

    <choose-auth-user ref="chooseAuthUserModal"></choose-auth-user>
    <export-history ref="exportHistoryModal"></export-history>

  </div>
</template>


<script>


  export default {
    data() {
      return {
        templates: [],
        param: {},
        query: {user: [], answer: []},
        searchResult: {},
        processing: false
      }
    },

    computed: {},

    mounted() {
      this.listAll();
    },


    methods: {
      listAll() {
        this.$http.get("spring/question/template/listAllEnabled")
          .then(function (resp) {
            var data = resp.data;
            this.templates = data;
            if (data.length == 0) {
              return;
            }
            var t = data[0];
            this.param.template = t;
          });

      },
      startSearch() {

        this.$refs.searchModal.show(this.param.template.id);
      },
      queryStart() {
        this.processing = true;
      },
      updateSearchResult(result) {
        this.searchResult = result;
        this.processing = false;
      },
      forceUpdate() {
        console.log(this);
        this.$forceUpdate();
      },
      handleCurrentChange(page) {
        this.processing = true;
        this.$refs.searchModal.queryPage(this.searchResult.queryId, page);
      },
      selectAuthUser(queryResult) {
        this.$refs.chooseAuthUserModal.show(queryResult);
      },
      showExportHistory(template){
        this.$refs.exportHistoryModal.show(template);
      },
      showAnalysis(queryId){
        let routeData = this.$router.resolve({
          name: 'QuestionAnalysis',
          params: {queryId: queryId}
        });
        window.open(routeData.href, '_blank');
      }
    }
  }
</script>
