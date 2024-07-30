/**
 * Extend the base Actor document to support attributes and groups with a custom template creation dialog.
 * @extends {Actor}
 */
export class SimpleActor extends Actor {

  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();
    this.system.groups = this.system.groups || {};
    this.system.attributes = this.system.attributes || {};
  }

  /* -------------------------------------------- */

  /** @override */
/*  static async createDialog(data={}, options={}) {
    return EntitySheetHelper.createDialog.call(this, data, options);
  }*/

  /* -------------------------------------------- */

  /**
   * Is this Actor used as a template for other Actors?
   * @type {boolean}
   */
  get isTemplate() {
    return !!this.getFlag("masseffect", "isTemplate");
  }

  /* -------------------------------------------- */
  /*  Roll Data Preparation                       */
  /* -------------------------------------------- */

  /** @inheritdoc */
  getRollData() {

    // Copy the actor's system data
    const data = this.toObject(false).system;
    const formulaAttributes = [];
    const itemAttributes = []; 
    return data;
  }



  /** @inheritdoc */
  async modifyTokenAttribute(attribute, value, isDelta = false, isBar = true) {
    const current = foundry.utils.getProperty(this.system, attribute);
    if ( !isBar || !isDelta || (current?.dtype !== "Resource") ) {
      return super.modifyTokenAttribute(attribute, value, isDelta, isBar);
    }
    const updates = {[`system.${attribute}.value`]: Math.clamped(current.value + value, current.min, current.max)};
    const allowed = Hooks.call("modifyTokenAttribute", {attribute, value, isDelta, isBar}, updates);
    return allowed !== false ? this.update(updates) : this;
  }
}
