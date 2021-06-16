package com.hengzhi.utils;

import com.hengzhi.entity.Questions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Paging {
    public static Map getPage(List list,int TotalNumber,int size,int page){
        Double all= Math.ceil((float)TotalNumber/size);
        int allP=all.intValue();
        Map map = new HashMap();
        if(page<=allP){
            List qlist=new ArrayList<>();
            int start=size*(page-1);
            int end=size*page-1;
            if(end>=list.size()){
                end=list.size()-1;
            }
            for(int i=start;i<=end;i++){
                qlist.add(list.get(i));
            }

            map.put("list",qlist);}

        else map.put("list",null);
        map.put("TotalNumber",TotalNumber);
        if(TotalNumber<size){
            map.put("pagesSize",1);
        } else if(TotalNumber%size==0){
            map.put("pagesSize",TotalNumber/size);
        }else {
            map.put("pagesSize",TotalNumber/size+1);
        }
        map.put("page",page);
        return map;
    }
}
