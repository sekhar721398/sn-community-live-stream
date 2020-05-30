var TemplateTask = Class.create();
TemplateTask.prototype = {
	initialize: function() {
	},

	copyTemplates : function(videoGr) {

		var defaultFields = "name,order,description,short_description,assigned_to";
		
		var fieldProperty = gs.getProperty('x_66238_cls323.task.field.list', defaultFields);
		gs.info('fieldProperty=' + fieldProperty);
		
		// Define the fields to copy
		var fieldList = fieldProperty.split(',');

		// Get all the template records
		var templateGr = new GlideRecord(Constants.TEMPLATE_TASK_TABLE);
		templateGr.query();

		// For each record found...
		while (templateGr.next()) {

			// Create a new target record
			var todoGr = new GlideRecord(Constants.TODO_TABLE);
			todoGr.newRecord();

			// Copy all the defined fields
			for (var i = 0; i < fieldList.length; i++) {
				var f = fieldList[i];
				todoGr.setValue(f, templateGr.getValue(f));
			}

			todoGr.video = videoGr.getUniqueValue(); // link it to the parent video record

			// Create the new target record
			todoGr.insert();
		}
	},
	
	hasTasks : function(videoGr) {
		
		var todoGr = new GlideRecord(Constants.TODO_TABLE);
		todoGr.setLimit(1);
		todoGr.addQuery('video', videoGr.getUniqueValue());
		todoGr.query();
		
		return todoGr.hasNext();
		
	},

	type: 'TemplateTask'
};