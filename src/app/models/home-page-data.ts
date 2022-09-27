export interface homePage {
    slider_images: string[];
    overview: string;
    notice: {
        img: string;
        details: string;
    }[];
    featured_gallery: string[];
    events: {
        img: string;
        details: string;
    }[];
    // school_calender: [];
    // history: [];
    campus: {
        img: string;
        details: string;
    }[];
    teachers: {
        img: string;
        name: string;
        subject: string;
    }[];
    managing_committee: {
        img: string;
        name: string;
        topic: string;
    }[];
    // admission: {};
    subject_offered: {
        v: string[];
        vi: string[];
        vii_viii: string[];
        ix_x: string[];
        xi_xii: string[];
    };
    school_timing: {
        class: string;
        i: string;
        ii: string;
        iii: string;
        iv: string;
    }[];
    rules_regulations: string[];
    alumni: {
        img: string;
        name: string;
    }[];
    contact_us: {
        type: string;
        details: string;
    }[];
}

