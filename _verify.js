/**
 * Created by ���� on 2017/6/10.
 */

(function( $ ) {
    $.fn._verify = function(obj) {
        var that=this,empty=/[\S\w]+/,phone=/^1\d{10}$/,email=/[A-Za-z_0-9.-]+@[\w-]+\.[a-zA-Z]{2,3}$/,QQ=/^[1-9]\d{4,15}$/,name=/^[a-zA-Z\u4e00-\u9fa5]{1,6}$/,obj1={},timer,
            obj=$.extend({error:function () {},success:function () {}},obj);
        var   Validate={
            boolen:true,
            init:function () {
                this.empty();
                this.phone();
                this.email();
                this.name();
                this.QQ();
                if(this.boolen){
                        Validate.suc(obj1)
                }
            },
            empty:function () {
                var required=that.find("[data-required]");
                this.validate(required,"required",empty)
            },
            QQ:function () {
                var qqs=that.find("[data-qq]");
                if(qqs.length) {
                    this.validate(qqs, "qq", QQ)
                }
            },
            name:function () {
                var names=that.find("[data-name]");
                if(names.length) {
                    this.validate(names, "name", name)
                }
            },
            phone:function () {
                var phones=that.find("[data-phone]");

                if(phones.length){
                    this.validate(phones,"phone",phone)
                };
            },
            email:function () {
                var emails=that.find("[data-email]");
                if(emails.length){
                    this.validate(emails,"email",email)
                };
            },
            validate:function(ele,data,reg){
                ele.on('focus',function(){
                    Validate.removes($(this))
                })
                ele.on('blur',function(){
                    Validate.eachs($(this), data,reg);
                })
                ele.each(function () {
                    Validate.eachs($(this), data,reg);
                })

            },
            suc:function (obj1) {
                obj.success(obj1);

            },
            err:function (th) {
                obj.error(th);
            },
            eachs:function ($data,att,vali) {
                var val=$data.val(),datas=$data.data(att),arr1=[],nameArr=$.trim($data.attr('name'));
                if(!vali.test(val)){
                    !($data.hasClass('j-error'))?$data.addClass('j-error').after('<span class="j-span"style="color: #f96868;"><i class="j-warn"></i><span>'+datas+'</span></span>'):'';
                    Validate.err($data);
                    return Validate.boolen=false;
                }else {
                    obj1[nameArr]=val;
                }
            },
            removes:function($this){
                $this.hasClass('j-error')?$this.removeClass('j-error').next('.j-span').remove():'';
            }
        }
        Validate.init();
        return that;
    };
    var textarea=function () {
        var text=$("[data-textarea]"),int=0;
        text.each(function () {
            var val=$(this).data('textarea');
            $(this).after('<span class="js-text">最多输入<span style="color: #f96868;">'+val+'</span>字</span>')
        })
        text.on('input propertychange',function () {
            var ints=parseInt($(this).data('textarea')),val=$.trim($(this).val());
            int=ints-val.length;
            if(int<=0){
                int=0;
                $(this).val(val.slice(0,ints));
            };
            $(this).next('.js-text').html('还可输入<span style="color: #f96868;">'+int+'</span>字')
        })
    }
    textarea();
})( jQuery );