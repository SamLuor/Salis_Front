<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-6">
      <div class="card">
        <h5>InputText</h5>
        <div class="grid formgrid">
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <InputText type="text" placeholder="Default"></InputText>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <InputText
              type="text"
              placeholder="Disabled"
              :disabled="true"
            ></InputText>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <InputText type="text" placeholder="Invalid" class="p-invalid" />
          </div>
        </div>

        <h5>Icons</h5>
        <div class="grid formgrid">
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <span class="p-input-icon-left">
              <i class="pi pi-user" />
              <InputText type="text" placeholder="Username" />
            </span>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <span class="p-input-icon-right">
              <InputText type="text" placeholder="Search" />
              <i class="pi pi-search" />
            </span>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <span class="p-input-icon-left p-input-icon-right">
              <i class="pi pi-user" />
              <InputText type="text" placeholder="Search" />
              <i class="pi pi-search" />
            </span>
          </div>
        </div>

        <h5>Float Label</h5>
        <span class="p-float-label">
          <InputText id="username" type="text" v-model="floatValue" />
          <label for="username">Username</label>
        </span>

        <h5>Textarea</h5>
        <Textarea
          placeholder="Your Message"
          :autoResize="true"
          rows="3"
          cols="30"
        />

        <h5>AutoComplete</h5>
        <AutoComplete
          placeholder="Search"
          id="dd"
          :dropdown="true"
          :multiple="true"
          v-model="selectedAutoValue"
          :suggestions="autoFilteredValue"
          @complete="searchCountry($event)"
          field="name"
        />

        <h5>Calendar</h5>
        <Calendar
          :showIcon="true"
          :showButtonBar="true"
          v-model="calendarValue"
        ></Calendar>

        <h5>Spinner</h5>
        <InputNumber
          v-model="inputNumberValue"
          showButtons
          mode="decimal"
        ></InputNumber>

        <h5>Chips</h5>
        <Chips v-model="chipsValue" />
      </div>

      <div class="card">
        <div class="grid">
          <div class="col-12">
            <h5>Slider</h5>
            <InputText v-model.number="sliderValue" />
            <Slider v-model="sliderValue" />
          </div>
          <div class="col-12 md:col-6">
            <h5>Rating</h5>
            <Rating v-model="ratingValue" />
          </div>
          <div class="col-12 md:col-6">
            <h5>ColorPicker</h5>
            <ColorPicker style="width: 2rem" v-model="colorValue" />
          </div>
          <div class="col-12">
            <h5>Knob</h5>
            <Knob
              v-model="knobValue"
              :step="10"
              :min="-50"
              :max="50"
              valueTemplate="{value}%"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <h5>RadioButton</h5>
        <div class="grid">
          <div class="col-12 md:col-4">
            <div class="field-radiobutton mb-0">
              <RadioButton
                id="option1"
                name="option"
                value="Chicago"
                v-model="radioValue"
              />
              <label for="option1">Chicago</label>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="field-radiobutton mb-0">
              <RadioButton
                id="option2"
                name="option"
                value="Los Angeles"
                v-model="radioValue"
              />
              <label for="option2">Los Angeles</label>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="field-radiobutton mb-0">
              <RadioButton
                id="option3"
                name="option"
                value="New York"
                v-model="radioValue"
              />
              <label for="option3">New York</label>
            </div>
          </div>
        </div>

        <h5>Checkbox</h5>
        <div class="grid">
          <div class="col-12 md:col-4">
            <div class="field-checkbox mb-0">
              <Checkbox
                id="checkOption1"
                name="option"
                value="Chicago"
                v-model="checkboxValue"
              />
              <label for="checkOption1">Chicago</label>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="field-checkbox mb-0">
              <Checkbox
                id="checkOption2"
                name="option"
                value="Los Angeles"
                v-model="checkboxValue"
              />
              <label for="checkOption2">Los Angeles</label>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="field-checkbox mb-0">
              <Checkbox
                id="checkOption3"
                name="option"
                value="New York"
                v-model="checkboxValue"
              />
              <label for="checkOption3">New York</label>
            </div>
          </div>
        </div>

        <h5>Input Switch</h5>
        <InputSwitch v-model="switchValue" />
      </div>

      <div class="card">
        <h5>Listbox</h5>
        <Listbox
          v-model="listboxValue"
          :options="listboxValues"
          optionLabel="name"
          :filter="true"
        />

        <h5>Dropdown</h5>
        <Dropdown
          v-model="dropdownValue"
          :options="dropdownValues"
          optionLabel="name"
          placeholder="Select"
        />

        <h5>MultiSelect</h5>
        <MultiSelect
          v-model="multiselectValue"
          :options="multiselectValues"
          optionLabel="name"
          placeholder="Select Countries"
          :filter="true"
        >
          <template #value="slotProps">
            <div
              class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2"
              v-for="option of slotProps.value"
              :key="option.code"
            >
              <span
                :class="'mr-2 flag flag-' + option.code.toLowerCase()"
                style="width: 18px; height: 12px"
              />
              <div>{{ option.name }}</div>
            </div>
            <template v-if="!slotProps.value || slotProps.value.length === 0">
              <div class="p-1">Select Countries</div>
            </template>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <span
                :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()"
                style="width: 18px; height: 12px"
              />
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </MultiSelect>

        <h5>TreeSelect</h5>
        <TreeSelect
          v-model="selectedNode"
          :options="treeSelectNodes"
          placeholder="Select Item"
        ></TreeSelect>
      </div>

      <div class="card">
        <h5>ToggleButton</h5>
        <ToggleButton
          v-model="toggleValue"
          onLabel="Yes"
          offLabel="No"
          :style="{ width: '10em' }"
        />

        <h5>SelectButton</h5>
        <SelectButton
          v-model="selectButtonValue1"
          :options="selectButtonValues1"
          optionLabel="name"
        />

        <h5>SelectButton - Multiple</h5>
        <SelectButton
          v-model="selectButtonValue2"
          :options="selectButtonValues2"
          optionLabel="name"
          :multiple="true"
        />
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Input Groups</h5>
        <div class="grid p-fluid">
          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
              </span>
              <InputText placeholder="Username" />
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"
                ><i class="pi pi-shopping-cart"></i
              ></span>
              <span class="p-inputgroup-addon"
                ><i class="pi pi-globe"></i
              ></span>
              <InputText placeholder="Price" />
              <span class="p-inputgroup-addon">$</span>
              <span class="p-inputgroup-addon">.00</span>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <Button label="Search" />
              <InputText placeholder="Keyword" />
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon p-inputgroup-addon-checkbox">
                <Checkbox v-model="inputGroupValue" :binary="true" />
              </span>
              <InputText placeholder="Confirm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountryService from '@/service/CountryService'
import NodeService from '@/service/NodeService'
export default {
  data() {
    return {
      floatValue: null,
      autoValue: null,
      selectedAutoValue: null,
      autoFilteredValue: [],
      calendarValue: null,
      inputNumberValue: null,
      chipsValue: null,
      sliderValue: 50,
      ratingValue: null,
      colorValue: '1976D2',
      radioValue: null,
      checkboxValue: [],
      switchValue: false,
      listboxValues: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
      ],
      listboxValue: null,
      dropdownValues: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
      ],
      dropdownValue: null,
      multiselectValue: null,
      multiselectValues: [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
      ],
      toggleValue: false,
      selectButtonValues1: [
        { name: 'Option 1', code: 'O1' },
        { name: 'Option 2', code: 'O2' },
        { name: 'Option 3', code: 'O3' }
      ],
      selectButtonValue1: null,
      selectButtonValues2: [
        { name: 'Option 1', code: 'O1' },
        { name: 'Option 2', code: 'O2' },
        { name: 'Option 3', code: 'O3' }
      ],
      selectButtonValue2: null,
      inputGroupValue: false,
      knobValue: 20,
      treeSelectNodes: null,
      selectedNode: null
    }
  },
  countryService: null,
  nodeService: null,
  created() {
    this.countryService = new CountryService()
    this.nodeService = new NodeService()
  },
  mounted() {
    this.countryService.getCountries().then((data) => (this.autoValue = data))
    this.nodeService
      .getTreeNodes()
      .then((data) => (this.treeSelectNodes = data))
  },
  methods: {
    searchCountry(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.autoFilteredValue = [...this.autoValue]
        } else {
          this.autoFilteredValue = this.autoValue.filter((country) => {
            return country.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase())
          })
        }
      }, 250)
    }
  }
}
</script>
