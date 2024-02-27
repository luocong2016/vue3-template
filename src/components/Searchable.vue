<script lang="tsx">
import type { PropType } from 'vue'

import { defineComponent } from 'vue'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
// @ts-ignore
import _ from 'lodash'
import { CloseOutlined } from '@ant-design/icons-vue'
import { Card, Flex, Radio, Space, Button, Select, Input } from 'ant-design-vue'

import Searchable from '@/components/Searchable.vue'

export const addConditionItem = (options?: SearchableBasicNode) => ({
  key: uuidv4(),
  field: null,
  symbol: null,
  value: null,
  ...options,
  type: 'node'
})

export const addConditionGroupItem = (options?: SearchableNode) => ({
  logic: 'and',
  ...addConditionItem(),
  condition: [addConditionItem()],
  ...options,
  type: 'group'
})

export function findAndDeleteNode(targetId: string | number, tree: SearchableNode): boolean {
  if (!tree.condition || !tree.condition.length) {
    return false
  }

  return tree.condition.some((o: SearchableNode, i) => {
    if (o.key === targetId) {
      tree.condition?.splice(i, 1)
      return true
    }
    return findAndDeleteNode(targetId, o)
  })
}

export const logicList = [
  { label: 'and', value: 'and' },
  { label: 'or', value: 'or' }
]

export const opList = [
  { label: '等于', value: '==' },
  { label: '不等于', value: '!=' },
  { label: '大于', value: '<' },
  { label: '小于', value: '>' }
]

export const typeList = [
  { label: 'node', value: 'node' },
  { label: 'group', value: 'group' }
]

interface SearchableBasicNode {
  key: string | number
  field: string | number | null
  symbol: string | number | null
  type: string | number | null
  value: any
}

interface SearchableNode extends SearchableBasicNode {
  logic?: string | number
  condition?: SearchableNode[]
  [key: string]: any
}

interface SearchableBaseItem {
  label: string
  value: any
  [key: string]: any
}

export default defineComponent({
  props: {
    deep: Boolean,
    parent: {
      type: Object as PropType<SearchableNode>,
      default: null
    },
    fields: {
      type: Array as PropType<SearchableBaseItem[]>,
      default: () => [
        { value: 'name', label: '姓名' },
        { value: 'sex', label: '性别' }
      ]
    },
    object: {
      type: Object as PropType<SearchableNode>,
      default: () => ({
        logic: 'and',
        condition: [{ key: uuidv4(), field: '', symbol: '', type: '', value: '' }]
      })
    },
    opList: {
      type: Array as PropType<SearchableBaseItem[]>,
      default: () => opList
    },
    typeList: {
      type: Array as PropType<SearchableBaseItem[]>,
      default: () => typeList
    },
    logicList: {
      type: Array as PropType<SearchableBaseItem[]>,
      default: () => logicList
    }
  },

  setup(props) {
    const addItem = (object: SearchableNode) => {
      object.condition?.unshift(addConditionItem())
    }

    const addGroup = (object: SearchableNode) => {
      console.log(addConditionGroupItem())
      object.condition?.push(addConditionGroupItem())
    }

    const deleteNode = (key: string | number) => {
      findAndDeleteNode(key, props.parent)
    }

    return () => (
      <div class="searchable">
        <Card>
          <Flex justify="space-between" align="center">
            <Radio.Group buttonStyle="solid" v-model:value={props.object.logic}>
              {props.logicList.map(o => (
                <Radio.Button value={o.value} key={o.value}>
                  {o.label}
                </Radio.Button>
              ))}
            </Radio.Group>

            <Space>
              <Button onClick={() => addGroup(props.object)}>新增分组</Button>
              <Button onClick={() => addItem(props.object)}>新增条件</Button>
              {props.deep && (
                <Button
                  type="link"
                  onClick={() => deleteNode(props.object.key)}
                  v-slots={{
                    icon: () => <CloseOutlined />
                  }}
                />
              )}
            </Space>
          </Flex>

          {props.object.condition?.map(o => (
            <>
              {o.type === 'node' ? (
                <Flex class="searchable__child" key={o.key}>
                  <Space>
                    <Select options={props.fields} v-model:value={o.field} placeholder="请选择" />
                    <Select options={props.opList} v-model:value={o.symbol} placeholder="请选择" />
                    <Select options={props.typeList} v-model:value={o.type} placeholder="请选择" />
                    <Input v-model:value={o.value} placeholder="请输入" />
                    <Button
                      type="link"
                      danger
                      onClick={() =>
                        _.remove(
                          props.object.condition,
                          (item: SearchableBasicNode) => item.key === o.key
                        )
                      }
                    >
                      删除
                    </Button>
                  </Space>
                </Flex>
              ) : (
                o.condition?.length && (
                  <Flex class="searchable__child" key={o.key}>
                    <Searchable object={o} deep={true} parent={props.object} />
                  </Flex>
                )
              )}
            </>
          ))}
        </Card>
      </div>
    )
  }
})
</script>

<style lang="less" scoped>
.searchable {
  width: 100%;
  position: relative;

  :deep(.ant-select) {
    min-width: 220px;
  }

  :deep(.ant-flex) {
    padding-top: 12px;
  }

  &__child {
    position: relative;
    border: 1px solid #d9d9d9;
    border-style: none none none solid;
    padding: 10px 0;
    padding-left: 12px;

    &::after {
      top: 50%;
      left: 0;
      position: absolute;
      content: '';
      display: block;
      width: 10px;
      height: 1px;
      border: 1px solid #d9d9d9;
      border-style: solid none none none;
    }

    &::before {
      display: block;
      content: '';
      position: absolute;
      background-color: white;
      width: 1px;
      height: 50%;
    }

    &:first-child::before {
      left: -1px;
      top: 0;
    }

    &:last-child::before {
      left: -1px;
      bottom: 0;
    }
  }
}
</style>
