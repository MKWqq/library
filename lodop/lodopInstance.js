function printParams(){

    LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //规定纸张大小；使用A4纸。
    //SET_PRINT_STYLE:设置纯文本打印项风格,格式：SET_PRINT_STYLE(strStyleName,varStyleValue)。
    //strStyleName：打印风格名，设定纯文本风格名称及其含义如下：|varStyleValue：打印风格值，相关值如下：
    //“FontName”： 字体名称。|值： 字符型，与操作系统字体名一致，缺省是“宋体”。
    //“FontSize”： 字体大小。|值：数值型，单位是pt，缺省值是9，可以含小数，如13.5。
    //“FontColor”： 字体颜色。|值：整数或字符型，如同CSS的color。
    //“Bold”： 是否粗体。|值：数字型，1代表粗体，0代表非粗体，缺省值是0。
    //“Italic”： 是否斜体。|值：数字型，1代表斜体，0代表非斜体，缺省值是0。
    //“Underline”： 是否下滑线。|值：数字型，1代表有下划线，0代表无下划线，缺省值是0。
    //“Alignment”： 内容左右靠齐方式。|值：数字型，1--左靠齐 2--居中 3--右靠齐，缺省值是1。
    //“Angle”： 旋转角度。|值：数字型，逆时针旋转角度数，单位是度，0度表示不旋转


    //注意：设定样式可以覆盖，更多设置参考技术使用文档。
    LODOP.SET_PRINT_STYLE("FontColor", "#000000");//字体颜色
    LODOP.SET_PRINT_STYLE("FontSize", 14); //字体大小
    LODOP.ADD_PRINT_TEXT(50, 50, 100, 39, "我的博客"); //内容，参数（左边距，上边距，内容显示宽度，内容显示高度）


    LODOP.SET_PRINT_STYLE("FontColor", "#00ff00"); //更换颜色
    LODOP.ADD_PRINT_TEXT(80, 50, 360, 39, "更换颜色");
    LODOP.SET_PRINT_STYLE("FontSize", 24); //更换大小
    LODOP.ADD_PRINT_TEXT(110, 50, 360, 39, "更换大小");


    LODOP.ADD_PRINT_LINE(150, 50, 200, 50, 0, 1); //线，竖杠(上边距1,1左边距,上边距2,2左边距,intLineStyle, intLineWidth)
    //intLineStyle:线条类型，默认为0；0--实线 1--破折线 2--点线 3--点划线 4--双点划线
    //intLineWidth:线条宽，默认是1，整数型，单位是(打印)像素，非实线的线条宽也是0。
    LODOP.ADD_PRINT_LINE(150, 50, 150, 200, 0, 1); //线，横杠(上边距1,1左边距,上边距2,2左边距,intLineStyle, intLineWidth)
    // LODOP.PREVIEW();//打印预览
    //LODOP. PRINT (); //不经打印预览的直接打印。
}

