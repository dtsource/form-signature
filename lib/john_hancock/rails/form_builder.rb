module JohnHancock
  module Rails
    module FormBuilder
      include ActionView::Helpers::TagHelper

      def signature_canvas(element_id)
        content_tag(:canvas, nil, class: 'JohnHancock-canvas', id: element_id)
      end

      def hidden_signature_field(attribute, element_id)
        hidden_field(attribute.to_sym, id: element_id+'-hidden')
      end

      def signature_field(attribute, element_id)
        tags = []
        tags << signature_canvas(element_id)
        tags << hidden_signature_field(attribute, element_id)
        tags.join(' ').html_safe
      end
    end
  end
end

JohnHancock::FormBuilder = JohnHancock::Rails::FormBuilder
