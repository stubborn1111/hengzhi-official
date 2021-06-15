package com.hengzhi.utils;

import java.util.Random;

public class randomNumber {

    public static int[] genNum(int num, int value)  {
        int[] arr = new int[num];// 保存最终生成结果
        int index = 0;// 状态索引 default = 0
        arr = new int[num];
        boolean result = true;
        while (result) {// 控制是否继续生成随机数
            Random rd = new Random();
            int tempRandomNum = rd.nextInt(value) + 1;
            if (arr[arr.length - 1] == 0) {// 决定是否继续生成随机数进行赋值
                if (isHas(tempRandomNum, arr, index)) {// 判断已生成随机数是否与数组中已有数值重复
                    continue;
                }
                arr[index++] = tempRandomNum;// 将生成的不重复发的随机数放入数组中
            } else
                result = false;
        }
        return arr;
    }

    /**
     * 判断是否已存在生成的随机数
     *
     * @param tempRandomNum
     * @param arr
     * @param index
     * @return
     */
    private static boolean isHas(int tempRandomNum, int[] arr, int index) {
        for (int i = 0; i < index; i++) {
            if (tempRandomNum == arr[i]) {
                return true;
            }
        }
        return false;
    }


}
