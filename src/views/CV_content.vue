<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <div class="cv_title">
                    <input type="text" v-model="title_cv">
                </div>
                <div class="main_cv">
                    <div class="cv__infor item__cv" @click="showDesc">
                        <div class="cv__infor--content">
                        <div class="cv__name">
                            <input type="text" />
                        </div>
                        <div class="cv__address">
                            <input type="text" />
                        </div>
                        <div class="social__list">
                            <div class="social__item">
                                <v-icon> mdi-phone</v-icon>
                                <input class="cv__phone" type="text" />
                            </div>
                            <div class="social__item">
                                <v-icon>mdi-email</v-icon>
                                  <input type="text" class="cv__mail" />
                            </div>
                            <div class="social__item">
                                <v-icon>mdi-facebook</v-icon>
                                <input type="text" class="cv__facebook" />  
                            </div>
                        </div>
                        </div>
                     <div class="option">
                            <v-icon> mdi-menu</v-icon>
                        </div>
                    </div>
                    <div class="cv__goal item__cv">
                        <div class="cv__infor--content ">
                        <div class="cv__goal--title item__cv--title">
                            <input type="text" value="MỤC TIÊU NGHỀ NGHIỆP"/>
                        </div>
                        <v-divider></v-divider>
                        <div class="cv__goal--content content__cv">
                            <input type="text" value="HELLO WORLD"/>
                             <div class="option__content">
                                    <v-btn color="success">
                                        <v-icon>mdi-plus</v-icon>
                                        Them
                                    </v-btn>
                                    <v-btn color="error">
                                        <v-icon>mdi-minus</v-icon>
                                        Xoa
                                    </v-btn>
                                </div>
                        </div>
                        </div>
                         <div class="option">
                            <v-icon> mdi-menu</v-icon>
                            <v-icon> mdi-menu-down</v-icon>
                            <v-icon>  mdi-menu-up </v-icon>
                            <v-btn color="error" @click="deleteItem($event)">
                                <v-icon>mdi-minus</v-icon>
                                An muc
                            </v-btn>
                        </div>
                    </div>
                    <div class="cv__study item__cv">
                        <div class="cv__infor--content ">
                        <div class="cv__study--title item__cv--title">
                            <input type="text" value="HỌC VẤN"/>
                        </div>
                        <v-divider></v-divider>
                        <div class="cv__study--content content__cv">
                            <input type="text" value="GIẢI THƯỞNG hello "/>
                             <div class="option__content">
                                    <v-btn color="success">
                                        <v-icon>mdi-plus</v-icon>
                                        Them
                                    </v-btn>
                                    <v-btn color="error">
                                        <v-icon>mdi-minus</v-icon>
                                        Xoa
                                    </v-btn>
                                </div>
                        </div>
                        </div>
                         <div class="option">
                            <v-icon> mdi-menu</v-icon>
                            <v-icon> mdi-menu-down</v-icon>
                            <v-icon>  mdi-menu-up </v-icon>
                            <v-btn color="error">
                                <v-icon>mdi-minus</v-icon>
                                An muc
                            </v-btn>
                        </div>
                    </div>
                    <div class="cv__rewards item__cv">
                        <div class="cv__infor--content ">
                        <div class="cv__rewards--title item__cv--title">
                            <input type="text" value="GIẢI THƯỞNG "/>
                        </div>
                        <v-divider></v-divider>
                        <div class="cv__rewards--content content__cv">
                            <input type="text" value="Giải khuyến khích học sinh giỏi Quốc gia Hóa học năm 12 "/>      
                             <div class="option__content">
                                    <v-btn color="success">
                                        <v-icon>mdi-plus</v-icon>
                                        Them
                                    </v-btn>
                                    <v-btn color="error">
                                        <v-icon>mdi-minus</v-icon>
                                        Xoa
                                    </v-btn>
                                </div>   
                        </div>
                        </div>
                         <div class="option">
                            <v-icon> mdi-menu</v-icon>
                            <v-icon> mdi-menu-down</v-icon>
                            <v-icon>  mdi-menu-up </v-icon>
                            <v-btn color="error">
                                <v-icon>mdi-minus</v-icon>
                                An muc
                            </v-btn>
                        </div>
                    </div>
                    <div class="cv__skills item__cv">
                        <div class="cv__infor--content ">
                        <div class="cv__skills--title item__cv--title">
                            <input type="text" value="CÁC KỸ NĂNG"/>    
                        </div>
                        <v-divider></v-divider>
                        <div class="cv__skills--content content__cv">
                            <v-container>
                                <v-row>
                                    <v-col cols="4">
                                        <input type="text" value="Tin học văn phòng" class="cv__skills--key">
                                    </v-col>
                                    <v-col cols="8">
                                        <input type="text" value="- Sử dụng thành thạo các công cụ Word, Excel, Power Point" class="cv__skills--value" >
                                    </v-col>
                                </v-row>
                                <div class="option__content">
                                    <v-btn color="success" @click="addItem($event)">
                                        <v-icon>mdi-plus</v-icon>
                                        Them
                                    </v-btn>
                                    <v-btn color="error" @click="deleteContent($event)">
                                        <v-icon>mdi-minus</v-icon>
                                        Xoa
                                    </v-btn>
                                </div>
                            </v-container>
                        </div>
                        </div>
                         <div class="option">
                            <v-icon> mdi-menu</v-icon>
                            <v-icon> mdi-menu-down</v-icon>
                            <v-icon>  mdi-menu-up </v-icon>
                            <v-btn color="error">
                                <v-icon>mdi-minus</v-icon>
                                An muc
                            </v-btn>
                        </div>
                    </div>
                    <div class="cv__hobbies item__cv">
                        <div class="cv__infor--content ">
                        <div class="cv__hobbies--title item__cv--title">
                            <input type="text" value="SỞ THÍCH"/>    
                        </div>
                        <v-divider></v-divider>
                        <div class="cv__hobbies--content content__cv">
                            <input type="text" value="World hello"/>  
                             <div class="option__content">
                                    <v-btn color="success">
                                        <v-icon>mdi-plus</v-icon>
                                        Them
                                    </v-btn>
                                    <v-btn color="error">
                                        <v-icon>mdi-minus</v-icon>
                                        Xoa
                                    </v-btn>
                                </div>  
                        </div>
                        </div>
                         <div class="option">
                            <v-icon> mdi-menu</v-icon>
                            <v-icon> mdi-menu-down</v-icon>
                            <v-icon>  mdi-menu-up </v-icon>
                            <v-btn color="error">
                                <v-icon>mdi-minus</v-icon>
                                An muc
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-col>
            <v-col cols="4">
                <Personal></Personal>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import Personal from './Instructions_CV/Personal_Info'
export default {
    name: 'ContentCV',
    data () {
        return {
            title_cv: "Untitled CV"
        }
    },
    components: {
        Personal
    },
    methods: {
        showDesc() {
            this.desc = !this.desc;

        },
        deleteItem(event) {
            const hiddenItem = event.target.parentNode.parentNode.parentNode.remove();
            console.log(hiddenItem);
            console.log(event);
        },
        addItem(event) {
            const oldItem = event.target.parentNode.parentNode.parentNode.parentNode;
            console.log(oldItem);
            const newItem = oldItem.cloneNode(true);
            console.log(newItem);
            oldItem.after(newItem);
        },
        deleteContent(event) {
            event.target.parentNode.parentNode.parentNode.parentNode.remove();
        }
    }
}
</script>
<style lang="scss">
.cv_title {
    text-align: center;
    padding: 5px;
    // border: 1px dashed;
    margin-bottom: 5px;
    background-color: rgb(201, 200, 200);
    font-size: 20px;
}

// .cv_title:hover {
//     border: 1px dashed;
// }

input[type="text"] {
    outline: none;
}

.main_cv {
    padding: 35px;
}
.cv__infor {
    position: relative;
    .option {
        position: absolute;
        left: 0;
        top: -22px;
        display: none;
        z-index: 15;
        background: rgb(201, 200, 200);
        .v-icon {
            background: white;
            margin-right: 5px;
        }
    }
.cv__infor--content {
    // // padding: 10px;
    // position: relative;
    // display: flex;
    // justify-content: center;
       input[type="text"] {
        // border: 1px dashed;
    padding: 5px;
    width: 50%;
    margin: 0 auto;
    display: inline-block;
    }
    .social__list {
        display: flex;
        justify-content: center;
    }
    .cv__name {
        display: flex;
        margin-bottom: 10px;
    }
    .cv__address {
        display: flex;
        margin-bottom: 10px;
    }
    .social__item {
        display: flex;
        margin-right: 10px;
        input {
            margin-left: 10px;
            width: 100%;
        }
    }
}

}

.item__cv {
    position: relative;
    .item__cv--title {
        font-weight: bold;
        font-size: 20px;
    }
    .cv__infor--content {
        padding: 20px;
        input[type="text"] {
        // border: 1px dashed;
    padding: 5px;
    width: 100%;
    margin: 0 auto;
    display: inline-block;
    }
    input[type="text"]:hover {
        border: 1px dashed;
    }
    .v-divider {
        margin-bottom: 5px;
    }
    // div:last-child {
    //     margin-top: 5px;
    // }
    }
    .option {
         position: absolute;
        left: 0;
        top: -28px;
        display: none;
        z-index: 15;
        background: rgb(201, 200, 200);
        padding: 5px;
        .v-icon {
            background: white;
            margin-right: 5px;
            border-radius: 5px;
            cursor: pointer;
        }
        .v-btn .v-icon {
            background: none;
        }
    }
    &:hover {
    .cv__infor--content {
        border: 3px solid rgb(201, 200, 200);
    }
    .option {
        display: block;
    }

    }
}
.content__cv {
    position: relative;
    .option__content {
        position: absolute;
        top: -28px;
        right: 0;
        z-index: 10;
        display: none;
    }
    &:hover .option__content {
        display: block;
    }
    div:last-child {
        margin-top: 0;
    }
}
</style>