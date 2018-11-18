$(document).ready(function () {
    function Validator(val, rule) {
        this.val = val;
        this.rule = rule;
    }
    Validator.prototype.isValid = function (realVal) {
        if (realVal)
            this.val = realVal;
        if (this.rule.required && !this.val)
            return false;
        for (x in this.rule) {
            if (x === "required")
                continue;
            var r = this['validate_' + x]();
            if (!r) return false;
        }
        return true;
    }
    Validator.prototype.pre_length = function () {
        this.val = (this.val).toString();
    }
    Validator.prototype.pre_min_max = function () {
        this.val = parseFloat(this.val);
    }
    Validator.prototype.validate_maxlength = function () {
        this.pre_length();
        return this.val.length <= this.rule.maxlength;
    }
    Validator.prototype.validate_minlength = function () {
        this.pre_length();
        return this.val.length >= this.rule.minlength;
    }
    Validator.prototype.validate_max = function () {
        this.pre_min_max();
        return this.val <= this.rule.max;
    }
    Validator.prototype.validate_min = function () {
        this.pre_min_max();
        return this.val >= this.rule.min;
    }
    Validator.prototype.validate_pattern = function () {
        this.pre_length();
        var reg = new RegExp(this.rule.pattern);
        return reg.test(this.val);
    }
    Validator.prototype.validate_length = function () {
        this.pre_length();
        return this.val.length == this.rule.length;
    }

    function Input(node) {
        var rule = {},
            $ele,
            me = this;

        function init() {

            if (node instanceof $)
                $ele = node;
            else
                $ele = $(node);
            parseRule();
            change();
        }

        function parseRule() {
            var ruleStr = $ele.data("rule");
            var ruleArry = ruleStr.split("|");
            for (var i = 0; i < ruleArry.length; i++) {
                var itemStr = ruleArry[i];
                var itemArry = itemStr.split(":");
                rule[itemArry[0]] = itemArry[1];
                console.log(itemArry)
            }
        }

        function getVal() {
            return $ele.val();
        }

        function change() {
            $ele.blur(function () {
                var parent = $ele.parent();
                if (!me.isValid($ele.val())) {
                    parent.addClass('has-error');
                    parent.find('.help-block').show();
                    console.log(parent.find('.help-block'))
                } else {
                    parent.removeClass('has-error').addClass('has-success');
                    parent.find('.help-block').hide();
                }
            })
        }
        this.isValid = function () {
            var val = getVal();
            console.log(val);
            console.log(rule);
            var validator = new Validator(val, rule);
            console.log(validator.isValid());
            return validator.isValid();
        }
        init();
    }

    function formValid($inputs) {
        for (var i = 0; i < $inputs.length; i++) {
            var r = $inputs[i].isValid();
            if (!r) return false;
        }
        return true;
    }

    function formSubmit() {
        var $form = $("form");
        $($form).each(function () {
            $(this).submit(function (e) {
                e.preventDefault();
                var $inputs = $(this).find('[data-rule]');
                console.log($(this).index())
                console.log($inputs.length)
                var inputs = [];
                $inputs.trigger('blur');
                $($inputs).each(function (index, node) {
                    inputs.push(new Input(node));
                })
                if (formValid(inputs)) {
                    var index = $(this).parent().index() + 1;
                    $(".tab-list li").eq(index).addClass('current').siblings().removeClass('current')
                    $(this).hide().parent().next().show();
                }
            })
        })
    }
    formSubmit();
    var $inputs = $('[data-rule]');
    var inputs = [];
    $($inputs).each(function (index, node) {
        inputs.push(new Input(node));
    })
});